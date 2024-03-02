const { Schema, model } = require("mongoose")

const Location = new Schema({
    "id": Number,
    "name": String,
    "city_id": Number,
    "groups": Array
})

module.exports = model("Location", Location)