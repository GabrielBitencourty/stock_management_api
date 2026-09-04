const express = require('express');
const client = express.Router()
const clientsController = require('./clientsController')
const tokenVerification = require('../midleware/tokenVerification.js')

client.get('/', tokenVerification, clientsController.getAllClients)
client.get('/:clientId', tokenVerification, clientsController.getClientById)
client.post('/createClient', tokenVerification, clientsController.createNewClient)
client.delete('/:clientEmail/delete', tokenVerification, clientsController.deleteUser)
client.put('/:clientId/update', tokenVerification, clientsController.updateClientById)

module.exports = client