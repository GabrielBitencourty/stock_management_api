const purchasesServices = require('./purchasesServices.js')
const dateTime = require('../utils/datetimeUtils.js')

async function getAllPurchases(req, res) {
    const purchasses = await purchasesServices.getAllPurchases()
    return res.status(purchasses.statusCode || 200).json(purchasses)
}

async function getPurchaseById(req, res) {
    const purchaseId = req.params.purchaseId

    if(!purchaseId || purchaseId == ":purchaseId") {
        return res.status(400).json({
            message: "Missing required Fields!",
            dateTime: dateTime.getCurrentDateTime()
        })
    }

    const purchasesResult = await purchasesServices.getPurchaseById(purchaseId)
    return res.status(purchasesResult.statusCode || 200).json(purchasesResult)
}

async function deletePurchase(req, res) {
    const purchaseId = req.params.purchaseId

     if(!purchaseId || purchaseId == ":purchaseId") {
        return res.status(400).json({
            message: "Missing required Fields!",
            dateTime: dateTime.getCurrentDateTime()
        })
    }

    const purchaseResult = await purchasesServices.deletePurchase(purchaseId)
    return res.status(purchaseResult.statusCode || 200).json(purchaseResult)
}

async function createNewPurchase(req, res) {

}

module.exports = {
    getAllPurchases,
    getPurchaseById,
    deletePurchase,
    createNewPurchase
}