const product = require('../model/Product.js');

async function getAllProducts() {
    const products = await product.find({});
    return products;
}

module.exports = {
    getAllProducts
}