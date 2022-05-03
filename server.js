const express = require('express');
const app = express();
const db = require("./db.js")
const path = require("path"); // Core path module
const uidSafe = require("uid-safe"); // Random string generator
const multer = require("multer"); // Multer file data middleware
const { upload } = require("./s3");

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// ======= Specify the storage location  =========//

const storage = multer.diskStorage({
    // Directory
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads"));
    },
    // Filename
    filename: (req, file, callback) => {
        // 1. Generate a random string
        uidSafe(24).then((randomId) => {
            // 2. Construct random file name with extension
            const fileName = `${randomId}${path.extname(file.originalname)}`;
            callback(null, fileName);
        });
    },
});

const uploader = multer({ storage });

// === Add a new route to receive the submission

app.post("/image", uploader.single("image"), upload /*"image" corresponds to your form data input field name*/ , (req, res) => {
    console.log("req.body:\t", req.body);
    // Multer puts the file info in `req.file`
    console.log("req.file:\t", req.file);
    console.log("req.params.id", req.params.id)
    let url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`
    let username = req.body.username
    let description = req.body.description
    let title = req.body.title
    console.log("Find the IMG with this URL: ", url)

    if (req.file) {
        // res.json({ success: true });

        db.uploadImage(url, username, title, description).then((insertedImage) => {
            console.log("IMAGE HAS BEEN UPLOADED 📥")
            console.log("INSERTED IMAGE", insertedImage)
            res.json(insertedImage.rows[0])
        }).catch((error) => {
            console.log("ERROR WHILE UPLOADING ❌📥", error)
        });

    } else {
        res.json({
            success: false
        });
    }
});


//==== FROM PART 1 =======


app.get("/api/images", (req, res) => {
    db.getAllImagesData().then((data) => {
        res.json(data)
    })
})

app.get('/image/:image_id', (req, res) => {
    console.log(req.params.image_id)
    db.getImageById(req.params.image_id).then((image) => {
        console.log("image im get request", image.rows)
        if (!image) {
            res.status(404).json({
                message: "Image not found",
            });
            return;
        }
        res.json(image);
    });
});

app.get("/comments/:image_id", (req, res) => {
    const image_id = req.params.image_id;
    console.log(req.params)

    db.getCommentsById(image_id).then((allComments) => {
        console.log("ALL THE COOMMENTS ",
            allComments)
        res.json(allComments)
    }).catch((error) => {
        console.log("ERROR", error);
    });
})


app.post("/comment", (req, res) => {
    const { comment, username, image_id } = req.body
    console.log("Post on comment")
    console.log(req.body)
    db.addComment(image_id, comment, username).
    then((comment) => {
        res.json(comment)
    }).catch((error) => {
        console.log("Error while adding comment ", error)
    })

})


app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});


//==== PART 3 =======
//We need a new /images/:image_id endpoint, that retrieves the info for the given id"



//======= = = = = = = = = = = = = = = = = =

app.listen(8080, () => console.log(`Listening 🟢`));