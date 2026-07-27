const express = require('express')
const product = express.Router()
const productsController = require("./productsController")

product.get("/", productsController.getProducts)

module.exports = product;