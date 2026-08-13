const dateTime = require('../utils/datetimeFormat.js')
const productRepository = require('./productsRepository.js')

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
          requestTime: dateTime.getCurrentDateTime(),
          status: 'Success: API is running',
          version: '1.0.0',
          Products: await productRepository.getProductByName(productName)
        }
    } catch (error) {
        throw new Error(error.message)
        console.log("Failed to get product by Id: ", error.message)
    }
}

module.exports = {
    getAllProducts,
    getProductByName
}