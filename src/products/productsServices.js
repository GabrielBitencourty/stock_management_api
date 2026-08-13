const productRepository = require('./productsRepository.js')
const { default: mongoose } = require('mongoose');
const product = require('./productsRoutes.js');
const dateTime = require('../utils/datetimeFormat.js')

async function getAllProducts() {
    try {
        return {
          requestTime: dateTime.getCurrentDateTime(),
          status: 'Success: API is running',
          version: '1.0.0',
          Products: await productRepository.getAllProducts()
        };
    } catch (error) {
        throw new Error(error.message)
        console.log("Error Message: ",  error.message)
    }
}

async function getProductByName(productName) {
    try {
        return {
          status: 'Success: API is running',
          version: '1.0.0',
          Products: await productRepository.getProductByName(productName)
        }
    } catch (error) {
        throw new Error(error.message)
        console.log("Failed to get product by Id: ", error.message)
    }
}

async function createNewProduct(body) {
    try {
        const payload = {
            _id: new mongoose.Types.ObjectId(),
            productName: body.productName,
            productId: body.productId,
            productDescription: body.productDescription,
            productPrice: body.productPrice,
            productCost: body.productCost,
            productStock: body.productStock,
            productCategory: body.productCategory,
            productBrand: body.productBrand,
            productImage: body.productImage,
            productBatch: body.productBatch,
            productSupplier: body.productSupplier
        }

        return {
          requestTime: dateTime.getCurrentDateTime(),
          status: 'Success: API is running',
          version: '1.0.0',
          Products: await productRepository.createNewProduct(payload)
        }
    } catch (error) {
        throw new Error(error.message)
        console.log("Error Message: ", error.message)
    }
}

async function getProductsById() {

}

module.exports = {
    getAllProducts,
    getProductByName,
    createNewProduct,
    getProductsById
}