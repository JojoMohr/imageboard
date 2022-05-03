const spicedPg = require("spiced-pg")
const db = spicedPg('postgres:postgres:postgres@localhost:5432/imageboard');

module.exports.getAllImagesData = (() => {
    const query = `SELECT * FROM images ORDER BY id DESC 
                   LIMIT 3`;
    return db.query(query).then((results) => results.rows)
})


module.exports.uploadImage = ((url, username, title, description) => {
    const query = `INSERT INTO images (url, username, title, description)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `;

    const params = [url, username, title, description];
    return db.query(query, params);
})

module.exports.getImageById = function(id) {
    const query = `SELECT * FROM images WHERE id = $1`;
    const params = [id]
    return db.query(query, params)
}

module.exports.addComment = function(image_id, comment, username) {
    console.log("Add comment FUNTION got called");

    const query = `
    INSERT INTO comments (image_id, comment, username)
    VALUES ($1,$2, $3)
    RETURNING *    
    `
    const params = [image_id, comment, username]
    return db.query(query, params)
}


// module.exports.getCommentsById = function(id) {
//     const query = `SELECT * FROM comments WHERE image_id = $1`;
//     const params = [id]
//     return db.query(query, params)

// }

module.exports.getCommentsById = function(id) {
    console.log("getCommentsById");
    return db
        .query("SELECT * FROM comments WHERE image_id = $1", [id])
        .then((result) => result.rows);
}