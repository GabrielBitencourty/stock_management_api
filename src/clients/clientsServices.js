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
        throw error
    }
}

async function getClientById(id) {
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { 
                status: 'Invalid client ID format!', 
                statusCode: 400 
            };
        }

        const validateClient = await client.findOne({_id: id})

        if(!validateClient) {
            return {
                status: 'The client does not exist!',
                statusCode: 404,
            }
        }

        return {
            requestTime: dateTime.getCurrentDateTime(),
            version: '1.0.0',
            clients: await clientsRepository.getClientById(id)
        };
    } catch (error) {
        console.log("Error:", error.messsage)
        throw error
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
        throw error
    }
}

async function deleteClient(email) {
    try {
        const validateEmail = await client.findOne({clientEmail: email})

        if(!validateEmail) {
            return {
                requestTime: dateTime.getCurrentDateTime(),
                status: 'Error: unable to process with the request!',
                statusCode: 404,
                version: '1.0.0',
            }
        }

        return {
            requestTime: dateTime.getCurrentDateTime(),
            version: '1.0.0',
            clients: await clientsRepository.deleteClient(email)
        };

    } catch (error) {
        console.log("Error: ", error.message)
        throw error
    }
}

async function updateClientById(clientId, body) {
    try {
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            return { 
                status: 'Invalid client ID format!', 
                statusCode: 400 
            };
        }

        const validateClient = await client.findOne({_id: clientId})

        if(!validateClient) {
            return {
                status: 'The client does not exist!',
                statusCode: 404,
            }
        }

        const clientReult = await clientsRepository.updateClient(clientId, body)

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: "Client updated successfully!",
            version: "1.0.0",
            data: clientReult
        };

    } catch (error) {
        console.log("Error:", error.message)
        throw error
    }
}

module.exports = {
    getAllClients,
    getClientById,
    createNewClient,
    deleteClient,
    updateClientById
}