const express = require('express');
const client = express.Router()
const clientsController = require('./clientsController')
const tokenVerification = require('../midleware/tokenVerification.js')
const validateSchema = require('../middlewares/validateSchema.js')
const { objectIdParamsSchema } = require('../schemas/commonSchemas.js')

client.get('/', tokenVerification, clientsController.getAllClients)
client.get('/:clientId', tokenVerification, validateSchema({ params: objectIdParamsSchema('clientId') }), clientsController.getClientById)
client.post('/createClient', tokenVerification, clientsController.createNewClient)
client.delete('/:clientEmail/delete', tokenVerification, clientsController.deleteUser)
client.put('/:clientId/update', tokenVerification, validateSchema({ params: objectIdParamsSchema('clientId') }), clientsController.updateClientById)

module.exports = client