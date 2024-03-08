const { Schema, model } = require("mongoose")

const Groups = new Schema({
    "id": Number,
    "groups": Array
})

module.exports = model("Groups", Groups)