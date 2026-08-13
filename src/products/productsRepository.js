const product = require('../model/Product.js');
const dateTime = require('../utils/datetimeFormat.js')

async function getAllProducts() {
    const products = await product.find({});
    return products;
}

async function getProductByName(productName) {
    const uniqueProduct = await product.findOne({
        productName: productName
    });

    if (!uniqueProduct) {
         return {
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Failed to get the product by Name',
            version: '1.0.0',
            statusCode: 404
        }
    }

    return uniqueProduct
}

async function createNewProduct(payload) {
    const newProduct = await product.create(payload)
    return newProduct
}

async function getProductById(productId) {
    const uniqueProduct = await product.findOne({
        productId: productId
    })

    if (!uniqueProduct) {
         return {
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Failed to get the product by Id',
            version: '1.0.0',
            statusCode: 404
        }
    }

    return uniqueProduct
}

module.exports = {
    getAllProducts,
    getProductByName,
    createNewProduct,
    getProductById
}