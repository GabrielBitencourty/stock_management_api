const addressServices = require('./addressServices.js')
const dateTime = require('../utils/datetimeUtils.js')

async function getListOfAdress(req, res) {
    const address = await addressServices.getListOfAdress()
    res.status(address.statusCode || 200).json(address)
}

async function getAddressByUserId(req, res) {

}

async function createNewAddress(req, res) {
    const userId = req.params.userId
    const body = req.body

    if (!userId || !body) {
        return res.status(400).json({
            message: "Error: Missing required fields!",
            dateTime: dateTime.getCurrentDateTime(),
            statusCode: 400,
        })
    }

    const newAddress = await addressServices.createNewAddress(userId, body)
    return res.status(newAddress.statusCode || 202).json(newAddress)
}

async function deleteAddress(req, res) {
    
}

async function updateAddressById(req, res) {

}

module.exports = {
    getListOfAdress,
    getAddressByUserId,
    createNewAddress,
    updateAddressById,
    deleteAddress
}