const Address = require('../model/Address.js')

async function getListOfAdress(){
    const address = await Address.find()
    return address
}

async function createNewAddress(payload){
    const newAddress = await Address.create(payload)
    return newAddress
}

module.exports = {
    getListOfAdress,
    createNewAddress
}