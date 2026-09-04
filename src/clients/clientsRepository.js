const client = require('../model/Clients.js')

async function getAllClients() {
    const clients = await client.find({});
    return clients;
}

async function getClientById(id) {
    const clientResult = await client.findOne({
        _id: id
    })

    return clientResult
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

async function deleteClient(email) {
    const deleteClient = await client.deleteOne({
        clientEmail: email
    })

    return {
        message: "Client deleted!",
        data: deleteClient
    }
}

async function updateClient(clientId, body) {
    const clientUpdate = await client.updateOne(
        {
            _id: clientId
        },
        {
            clientName: body.clientName,
            clientEmail: body.clientEmail,
            clientNumber: body.clientNumber,
            clientStatus: body.clientStatus
        }
    )
    return clientUpdate
}

module.exports = {
    getAllClients,
    getClientById,
    createNewClient,
    deleteClient,
    updateClient
}