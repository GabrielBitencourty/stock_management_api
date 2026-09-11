const mongoose = require("mongoose")

const purchasesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    purchasesAmount: Number,
    purchasesDate: String,
    productName: String,
    clientId: String,
    clientName: String,
    paymentMethod: String,
})

const Purchases = mongoose.model("purchases", purchasesSchema)
module.exports = Purchases