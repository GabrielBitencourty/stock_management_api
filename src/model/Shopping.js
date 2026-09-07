const mongoose = require("mongoose")

//TODO: create this model
const shoppingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
})

const Shopping = mongoose.model("Shooping", shoppingSchema)
module.exports = Shopping