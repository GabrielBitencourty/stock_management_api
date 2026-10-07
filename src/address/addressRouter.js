const express = require('express')
const address = express.Router()
const addressController = require('./addressController.js')
const tokenVerification = require('../midleware/tokenVerification.js')

address.get('/getAllAddress', tokenVerification, addressController.getListOfAdress)
address.get('/getAddressByAddressId/:addressId', tokenVerification, addressController.getAddressByAddressId)
address.post('/addNewAddress/:userId', tokenVerification, addressController.createNewAddress)
address.put('/updateAddress/:addressId', tokenVerification, addressController.updateAddressById)
address.delete('/deleteAdress/:addressId', tokenVerification, addressController.deleteAddressByid)

module.exports = address