const express = require('express')
const product = express.Router()
const productsController = require("./productsController")

product.get("/", productsController.getProducts)
product.get("/:productName", productsController.getProductByName)
product.get("/searchByName/:productName", productsController.getProductByName)
product.get("/searchById/:productId", productsController.getProductById)
product.post("/create", productsController.createNewProduct)
product.put("/update/:productId", productsController.updateProductById)
product.delete("/delete/:productId", productsController.deleteProductById)

module.exports = product;