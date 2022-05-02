const spicedPg = require("spiced-pg")
const db = spicedPg('postgres:postgres:postgres@localhost:5432/imageboard');

module.exports.getAllImagesData = (() => {
    const query = `SELECT * FROM images ORDER BY id DESC`;
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