const productRepository = require('./productsRepository.js')
const { default: mongoose } = require('mongoose');
const product = require('../model/Product.js');
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
        const dbProductValidation = await product.findOne({
            $or: [
                { productName: body.productName },
                { productId: body.productId }
            ]
        })

         if (dbProductValidation) {
            return {
                message: "Product already exists!",
                version: "1.0.0",
                requestTime: dateTime.getCurrentDateTime(),
                statusCode: 409,
            }
        }

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

async function getProductsById(productId) {
    try {
        return {
          status: 'Success: API is running',
          requestTime: dateTime.getCurrentDateTime(),
          version: '1.0.0',
          Products: await productRepository.getProductById(productId)
        }
    } catch (error) {
        throw new Error(error.message)
        console.log("Error Message: ", error.message)
    }
}

async function updateProductById(productId, body) {
    try {
        const productExist = await product.findOne({productId: productId})

        if (!productExist) {
            return {
                    message: "Product Not found!",
                    version: "1.0.0",
                    requestTime: dateTime.getCurrentDateTime(),
                    statusCode: 409,
                }
        }

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Success: API is running',
            version: '1.0.0',
            Products: await productRepository.updateProductById(productId, body)
        }

    } catch (error) {
        throw new Error(error.message)
        console.log("Error: ", error.message)
    }
}

module.exports = {
    getAllProducts,
    getProductByName,
    createNewProduct,
    getProductsById,
    updateProductById
}