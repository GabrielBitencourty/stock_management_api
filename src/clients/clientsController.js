const clientsServices = require('./clientsServices.js')
const dateTime = require('../utils/datetimeUtils.js')

async function getAllClients(req, res) {
    const clients = await clientsServices.getAllClients()
    res.status(200).json(clients)
}

async function createNewClient(req, res) {
    const { clientName, clientEmail, clientNumber } = req.body

    if (!clientName || !clientEmail || !clientNumber ) {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1",
        })
    }

    const createClients = await clientsServices.createNewClient(req.body)
    res.status(createClients.statusCode || 201).json(createClients)
}

module.exports = {
    getAllClients,
    createNewClient
}