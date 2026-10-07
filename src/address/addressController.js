const addressServices = require('./addressServices.js')
const dateTime = require('../utils/datetimeUtils.js')

async function getListOfAdress(req, res) {
    const address = await addressServices.getListOfAdress()
    res.status(address.statusCode || 200).json(address)
}

async function getAddressByAddressId(req, res) {
    const addressId = req.params.addressId

    if (!addressId) {
        return res.status(404).json({
            message: "Error: Missing required fields!",
            dateTime: dateTime.getCurrentDateTime()
        })
    }

    const addressResult = await addressServices.getAddressByAddressId(addressId)
    res.status(addressResult.statusCode || 200).json(addressResult)
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

async function updateAddressById(req, res) {
    const addressId = req.params.addressId
    const body = req.body

    if (!addressId || !body) {
        return res.status(404).json({
            message: "Error: Missing required fields!",
            dateTime: dateTime.getCurrentDateTime(),
            statusCode: 400,
        })
    }

    const addressResult = await addressServices.updateAddressById(addressId, body)
    return res.status(addressResult.statusCode).json(addressResult) 
}

async function deleteAddressByid(req, res) {
    const addressId = req.params.addressId

    if (!addressId) {
        return res.status(404).json({
            message: "Error: Missing required fields!",
            dateTime: dateTime.getCurrentDateTime() 
        })
    }
    
    const addressResult = await addressServices.deleteAddressByid(addressId)
    return res.status(addressResult.statusCode || 200).json(addressResult)
}

module.exports = {
    getListOfAdress,
    getAddressByAddressId,
    createNewAddress,
    updateAddressById,
    deleteAddressByid
}