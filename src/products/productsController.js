const productService = require("./productsServices")
const dateTime = require('../utils/datetimeFormat.js')

async function getProducts(req, res) {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
}

async function getProductByName(req, res) {
    const productName = req.params.productName;

    if (!productName) {
        return res.status(400).json({
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Error: Product ID is required',
            version: '1.0.0',
        });
    }

    const productResult = await productService.getProductByName(productName);
    res.status(productResult.Products.statusCode || 200).json(productResult)
}

async function getProductById(req, res) {
    const productId = req.params.productId

    if(!productId) {
        return res.status(400).json({
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Error: Product ID is required!',
            version: '1.0.0',
        });
    }

    const productResult = await productService.getProductsById(productId)
    res.status(productResult.Products.statusCode || 200).json(productResult)
}

async function updateProductById(req, res) {
    const productId = req.params.productId
    const body = req.body

    if (productId == ":productId") {
      return res.status(400).json({
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Error: productId is required',
            version: '1.0.0',
        });  
    }

    if (!body) {
        return res.status(400).json({
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Error: body is required',
            version: '1.0.0',
        });
    }

    const productResults = await productService.updateProductById(productId, body)
    res.status( productResults.statusCode || 200).json(productResults)
}

async function deleteProductById(req, res) {
    const productId = req.params.productId

    if(!productId){
        return res.status(400).json({
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Error: productId is required',
            version: '1.0.0',
        }); 
    }

    const deleteResult = await productService.deleteProductById(productId)
    res.status(deleteResult.statusCode || 200).json(deleteResult)
}

async function createNewProduct(req, res) {
    if (!req.body) {
        return res.status(404).json({
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Error: Missing body!',
            version: '1.0.0',
        });
    }

    const newProduct = await productService.createNewProduct(req.body)
    res.status(newProduct.statusCode || 201).json(newProduct)
}

module.exports = {
    getProducts,
    getProductByName,
    updateProductById,
    deleteProductById,
    getProductById,
    createNewProduct
}