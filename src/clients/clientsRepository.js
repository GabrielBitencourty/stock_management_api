const client = require('../model/Clients.js')

async function getAllClients() {
    const clients = await client.find({});
    return clients;
}

async function createNewClient(payload) {
    const newClients = await client.create(payload)

    const newClientObj = {
        clientName: newClients.clientName,
        clientEmail: newClients.clientEmail,
        clientNumber: newClients.clientNumber,
        clientStatus: newClients.clientStatus,
        clientRegistration: newClients.clientRegistration,
        clientPurchases: newClients.clientPurchases,
        totalClientSpend: newClients.totalClientSpend
    } 

    return newClientObj
}

module.exports = {
    getAllClients,
    createNewClient
}