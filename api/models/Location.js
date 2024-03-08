const { Schema, model } = require("mongoose")

const Location = new Schema({
    "id": Number,
    "name": String,
    "city_id": Number,
    "groups": {type: Schema.Types.ObjectId, ref: "Groups"}
})

module.exports = model("Location", Location)