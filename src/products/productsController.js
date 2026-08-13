const productService = require("./productsServices")

async function getProducts(req, res) {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
}

async function getProductByName(req, res) {
    const productName = req.params.productName;

    console.log("Pegou o nome: ", productName)

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

async function createProduct(req, res) {
    const { productName, productDescription, productPrice } = req.body;
}

async function updateProductById(req, res) {

}

async function deleteProductById(req, res) {

}

async function createNewProduct(req, res) {

}

module.exports = {
    getProducts,
    getProductByName,
    createProduct,
    updateProductById,
    deleteProductById,
    createNewProduct
}