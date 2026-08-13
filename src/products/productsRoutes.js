const express = require('express')
const product = express.Router()
const productsController = require("./productsController")

product.get("/", productsController.getProducts)
product.get("/:productName", productsController.getProductByName)
product.get("/search/:productName", productsController.getProductByName)
product.post("/create", productsController.createNewProduct)
product.put("/update/:productId", productsController.updateProductById)
product.delete("/delete/:productId", productsController.deleteProductById)

module.exports = product;