const { DataBrew } = require('aws-sdk');
const express = require('express');
const app = express();
const db = require("./db.js")
app.use(express.static('./public'));
const path = require("path"); // Core path module
const uidSafe = require("uid-safe"); // Random string generator
const multer = require("multer"); // Multer file data middleware
const { upload } = require("./s3");

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

    let url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`
    let username = req.body.username
    let description = req.body.description
    let title = req.body.title
    console.log("Find the IMG with this URL: ", url)

    db.uploadImage(url, username, title, description).then((insertedImage) => {
        console.log("IMAGE HAS BEEN UPLOADED 📥")
        console.log("INSERTED IMAGE", insertedImage)
            //  res.json(insertedImage.rows)
    }).catch((error) => {
        console.log("ERROR WHILE UPLOADING ❌📥", error)
    });


    // what we want to do at this point in time, is add the newly added img
    // data to the database
    // when that worked successfully we want to let the client side know
    // and provide all the new image data
    // if that did not work we should also let the client side know
    // BELOW IS ONLY TEMP CODE
    if (req.file) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});


//==== FROM PART 1 =======

app.use(express.json());
app.get("/api/images", (req, res) => {
    db.getAllImagesData().then((data) => {
        res.json(data)
    })
})


app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`Listening 🟢`));