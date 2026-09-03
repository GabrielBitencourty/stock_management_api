const express = require('express');
const client = express.Router()
const clientsController = require('./clientsController')
const tokenVerification = require('../midleware/tokenVerification.js')

client.get('/', tokenVerification, clientsController.getAllClients)
client.post('/createClient', tokenVerification, clientsController.createNewClient)

module.exports = client