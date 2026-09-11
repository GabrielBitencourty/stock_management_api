const Purchases = require('../model/Purchases.js')

async function getAllPurchases() {
    const purchases = await Purchases.find()
    return purchases
}

async function getPurchaseById(purchaseId) {
    const purchase = await Purchases.findOne({
        _id: purchaseId
    })

    if (!purchase) {
        return null
    }

    return purchase
}

async function deletePurchase(purchaseId){
    const purchase = await Purchases.deleteOne({
        _id: purchaseId
    })

    if (!purchase) {
        return null
    }

    return purchase
}

module.exports = {
    getAllPurchases,
    getPurchaseById,
    deletePurchase
}