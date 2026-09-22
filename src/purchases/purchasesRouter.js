const express = require('express');
const purchases = express.Router()
const purchasesController = require('./purchasesController.js')
const validateToken = require('../midleware/tokenVerification.js')

purchases.get('/', validateToken, purchasesController.getAllPurchases)
purchases.post('/createNewPurchase', validateToken, purchasesController.createNewPurchase)
purchases.get('/getPurchaseById/:purchaseId', validateToken, purchasesController.getPurchaseById)
purchases.delete('/deletePurchase/:purchaseId', validateToken, purchasesController.deletePurchase)

module.exports = purchases