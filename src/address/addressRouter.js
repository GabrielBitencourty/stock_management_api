const express = require('express')
const address = express.Router()
const addressController = require('./addressController.js')
const tokenVerification = require('../midleware/tokenVerification.js')

address.get('/getAllAddress', tokenVerification, addressController.getListOfAdress)
address.get('/getAddressByUserId/:userId', tokenVerification, addressController.getAddressByUserId)
address.post('/addNewAddress/:userId', tokenVerification, addressController.createNewAddress)
address.put('/updateAddress/:addressId', tokenVerification, addressController.updateAddressById)
address.delete('/deleteAdress', tokenVerification, addressController.deleteAddress)

module.exports = address