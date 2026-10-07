const Address = require('../model/Address.js')

async function getListOfAdress(){
    const address = await Address.find()
    return address
}

async function getAddressByAddressId(addressId){
    const address = await Address.findOne({
        _id: addressId
    })

    return address
}

async function createNewAddress(payload){
    const newAddress = await Address.create(payload)
    return newAddress
}

async function updateAddressById(addressId, body) {
    const address = Address.updateOne(
        {
            _id: addressId
        },  
        {
           country: body.country,
           city: body.city,
           state: body.state,
           street: body.street,
           neighborhood: body.neighborhood,
           zipCode: body.zipCode,
           number: body.number,
           location: body.location,
           complement: body.complement,
        }
    )

    return address
}

async function deleteAddressByid(addressId) {
    const address = Address.deleteOne({
        _id: addressId
    })

    return address
}

module.exports = {
    getListOfAdress,
    getAddressByAddressId,
    createNewAddress,
    updateAddressById,
    deleteAddressByid
}