const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: String,
    productId: String,
    productDescription: String,
    productPrice: Number,
    productValue: Number,
    productCost: Number,
    productStock: Number,
    productCategory: String,
    productBrand: String,
    productImage: String,
    productBatch: String,
    productSupplier: String,
});

const Product = mongoose.model("Product", productSchema)
module.exports = Product 
