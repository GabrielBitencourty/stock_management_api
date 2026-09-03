const express = require('express')
const product = express.Router()
const productsController = require("./productsController")
const tokenVerification = require('../midleware/tokenVerification.js')

product.get("/", tokenVerification, productsController.getProducts)
product.get("/:productName", tokenVerification, productsController.getProductByName)
product.get("/searchByName/:productName", tokenVerification, productsController.getProductByName)
product.get("/searchById/:productId", tokenVerification, productsController.getProductById)
product.post("/create", tokenVerification, productsController.createNewProduct)
product.put("/update/:productId", tokenVerification, productsController.updateProductById)
product.delete("/delete/:productId", tokenVerification, productsController.deleteProductById)

module.exports = product;