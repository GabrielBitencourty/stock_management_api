const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: String,
    category: String,
    amount: Number,
    costPrice: Number,
    finalPrice: Number,
})

const Product = mongoose.model("Product", productsSchema)
module.exports = Product 
