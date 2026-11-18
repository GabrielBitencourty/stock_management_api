const express = require('express')
const address = express.Router()
const addressController = require('./addressController.js')
const tokenVerification = require('../midleware/tokenVerification.js')
const validateSchema = require('../middlewares/validateSchema.js')
const { objectIdParamsSchema } = require('../schemas/commonSchemas.js')

address.get('/getAllAddress', tokenVerification, addressController.getListOfAdress)
address.get('/getAddressByAddressId/:addressId', tokenVerification, validateSchema({ params: objectIdParamsSchema('addressId') }), addressController.getAddressByAddressId)
address.post('/addNewAddress/:userId', tokenVerification, validateSchema({ params: objectIdParamsSchema('userId') }), addressController.createNewAddress)
address.put('/updateAddress/:addressId', tokenVerification, validateSchema({ params: objectIdParamsSchema('addressId') }), addressController.updateAddressById)
address.delete('/deleteAdress/:addressId', tokenVerification, validateSchema({ params: objectIdParamsSchema('addressId') }), addressController.deleteAddressByid)

module.exports = address