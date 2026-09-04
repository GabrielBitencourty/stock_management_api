const clientsServices = require('./clientsServices.js')
const dateTime = require('../utils/datetimeUtils.js')

async function getAllClients(req, res) {
    const clients = await clientsServices.getAllClients()
    res.status(200).json(clients)
}

async function getClientById(req, res) {
    const id = req.params.clientId

    if (!id || id == ":clientId") {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1",
        })
    }

    const getById = await clientsServices.getClientById(id)
    res.status(getById.statusCode || 200).json(getById)
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

async function deleteUser(req, res) {
    const email = req.params.clientEmail

    if (!email || email == ":clientEmail") {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1",
        })
    }

    const clientDeleteResult = await clientsServices.deleteClient(email)
    res.status(clientDeleteResult.statusCode || 200).json(clientDeleteResult)
}

async function updateClientById(req, res) {
    const clientId = req.params.clientId
    const { clientName, clientEmail, clientNumber, clientStatus } = req.body

    if (!clientId || clientId == ":clientId" || !clientName || !clientEmail || !clientNumber || !clientStatus) {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1",
        })
    }

    const clientResult = await clientsServices.updateClientById(clientId, req.body)
    res.status(clientResult.statusCode || 200).json(clientResult)
}

module.exports = {
    getAllClients,
    getClientById,
    createNewClient,
    deleteUser,
    updateClientById
}