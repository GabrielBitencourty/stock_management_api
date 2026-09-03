const product = require('../model/Product.js');
const dateTime = require('../utils/datetimeUtils.js');

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

async function updateProductById(productId, body) {
    const updateProduct = await product.updateOne(
        {productId: productId},
        {
            productName: body.productName,
            productDescription: body.productDescription,
            productPrice: body.productPrice,
            productCost: body.productCost,
            productStock: body.productStock,
            productCategory: body.productCategory,
            productBrand: body.productBrand,
            productImage: body.productImage
        }
    )

    const productUpdated = await product.findOne({productId: productId})
    return productUpdated
}

async function deleteProductById(productId) {
    const deleteProduct = await product.deleteOne({productId: productId})
    return deleteProduct
}

module.exports = {
    getAllProducts,
    getProductByName,
    createNewProduct,
    getProductById,
    updateProductById,
    deleteProductById
}