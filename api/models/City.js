const { Schema, model } = require("mongoose")

const City = new Schema({
    "id": Number,
    "name": String,
    "data": String
})

module.exports = model("City", City)