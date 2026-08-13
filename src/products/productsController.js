const productService = require("./productsServices")
const dateTime = require('../utils/datetimeFormat')

async function getProducts(req, res) {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
}

async function getProductByName(req, res) {
    const productName = req.params.productName;

    if (!productName) {
        return res.status(400).json({
            requestTime: new Date().toLocaleString("pt-BR"),
            status: 'Error: Product ID is required',
            version: '1.0.0',
        });
    }

    const product = await productService.getProductByName(productName);
    res.status(200).json(product);
}

async function updateProductById(req, res) {

}

async function deleteProductById(req, res) {

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
    res.status(200).json(newProduct);
}

module.exports = {
    getProducts,
    getProductByName,
    updateProductById,
    deleteProductById,
    createNewProduct
}