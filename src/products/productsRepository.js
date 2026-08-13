const product = require('../model/Product.js');

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
            status: 'Failed to get the product by Id',
            version: '1.0.0',
            statuscode: 404
        }
    }

    return uniqueProduct
}

async function createNewProduct(payload) {
    const newProduct = await product.create(payload)
    return newProduct
}

module.exports = {
    getAllProducts,
    getProductByName,
    createNewProduct
}