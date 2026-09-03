const clientsRepository = require('./clientsRepository.js')
const client = require('../model/Clients.js')
const mongoose = require('mongoose')
const dateTime = require('../utils/datetimeUtils.js')

async function getAllClients() {
    try {
        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Success: API is running',
            version: '1.0.0',
            clients: await clientsRepository.getAllClients()
        };
    } catch (error) {
        console.log("Error:", error.message)
        throw new Error(error.message)
    }
}

async function createNewClient(body) {
    try {
        const email = body.clientEmail
        const number = body.clientNumber
        const validateClient = await client.findOne({
            $or: [
                { clientEmail: email },
                { clientNumber: number }
            ]    
        })

        if (validateClient) {
            return {
                requestTime: dateTime.getCurrentDateTime(),
                status: 'The client already exists!',
                version: '1.0.0',
            }
        }

        const payload = {
            _id: new mongoose.Types.ObjectId(),
            clientName: body.clientName,
            clientEmail: body.clientEmail,
            clientNumber: body.clientNumber,
            clientStatus: "Active",
            clientRegistration: dateTime.getFormatedDateTime(),
            clientPurchases: 0,
            totalClientSpend: 0
        }

        const clientReult = await clientsRepository.createNewClient(payload)

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: "Client created successfully!",
            version: "1.0.0",
            data: clientReult
        };

    } catch (error) {
        console.log("Error:", error.message)
        throw new Error(error.message)
    }
}

module.exports = {
    getAllClients,
    createNewClient
}