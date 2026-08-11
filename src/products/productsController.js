const productService = require("./productsServices")

async function getProducts(req, res) {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
}

async function getProductById(req, res) {
    const { productId } = req.params;  
}

async function createProduct(req, res) {
    const { productName, productDescription, productPrice } = req.body;
}

async function updateProductById(req, res) {

}

async function deleteProductById(req, res) {

}

async function getProductByName(req, res) {

}

async function createNewProduct(req, res) {

}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
    getProductByName,
    createNewProduct
}