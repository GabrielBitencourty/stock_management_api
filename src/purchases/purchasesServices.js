const purchasesRepository = require('./purchasesRepository.js')
const dateTime = require('../utils/datetimeUtils.js')
const Purchases = require('../model/Purchases.js')

async function getAllPurchases() {
    try {
        const purchases = await purchasesRepository.getAllPurchases()
        return {
            requestTime: dateTime.getCurrentDateTime(),
            purchases: purchases,
            purchasesCount: purchases.length
        }
    } catch (error) {
        console.log("Error: ",error.message)
        throw error
    }
}

async function getPurchaseById(purchaseId) {
    try {
        return {
            message: "Returning the purchases!",
            dateTime: dateTime.getCurrentDateTime(),
            data: await purchasesRepository.getPurchaseById(purchaseId)
        }
    } catch (error) {
        console.log("Error:", error.message)
        throw error
    }
}

async function deletePurchase(purchaseId) {
    try {   
        const valideId = await Purchases.findOne({ _id: purchaseId })

        if(!valideId){
            return {
                requestTime: dateTime.getCurrentDateTime(),
                status: 'Error: unable to process with the request!',
                statusCode: 404,
            }
        }

        return {
            requestTime: dateTime.getCurrentDateTime(),
            message: "Purchace Canceled!",
            data: await purchasesRepository.deletePurchase(purchaseId)
        }
    } catch (error) {
        console.log("Error:", error.message)
        throw error
    }
}

module.exports = {
    getAllPurchases,
    getPurchaseById,
    deletePurchase
}