const express = require('express');
const client = express.Router()
const clientsController = require('./clientsController')

client.get('/', clientsController.getAllClients)

module.exports = client