const addressRepository = require('./addressRepository.js')
const dateTime = require('../utils/datetimeUtils.js')
const userServices = require('../users/userServices.js')
const { default: mongoose } = require('mongoose')

async function getListOfAdress() {
    try {
        const address = await addressRepository.getListOfAdress()

        if (!address) {
            return {
                dateTime: dateTime.getCurrentDateTime,
                message: "Something went wrong!",
                statusCode: 404
            }
        }

        return {
            dateTime: dateTime.getCurrentDateTime,
            message: "Data successfully recovered!",
            data: address
        }

    } catch (error) {
        console.log('Error:', error)
        throw error
    }
}

async function getAddressByAddressId(addressId) {
    try {
        const address = await addressRepository.getAddressByAddressId(addressId)

        if (!address) {
            return {
                dateTime: dateTime.getCurrentDateTime,
                message: "Something went wrong!",
                statusCode: 404
            }
        }

        return {
            dateTime: dateTime.getCurrentDateTime,
            message: "Data successfully recovered!",
            statusCode: 200,
            data: address
        }

    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}

async function createNewAddress(userId, body) {
    try {
        const userValid = await userServices.getUserById(userId)
        console.log("Body: ", body)

        if (!userValid) {
            return {
                dateTime: dateTime.getCurrentDateTime(),
                message: "The submitted user ID is invalid.",
                statusCode: 404,
            }
        }

        const payload = {
            _id: new mongoose.Types.ObjectId(),
            userId: userId,
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
        
        const data = await addressRepository.createNewAddress(payload)

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: "New address created successfully!",
            statusCode: 201,
            data: data
        }

    } catch (error) {
        console.log("Error ---> ", error)
        throw error
    }
}

async function updateAddressById(addressId, body) {
    try {
        const address = await getAddressByAddressId(addressId)

        if (!address) {
            return {
                dateTime: dateTime.getCurrentDateTime,
                message: "Something went wrong!",
                statusCode: 404
            }
        }

        const updateAddress = await addressRepository.updateAddressById(addressId, body)
        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: "Update address successfully!",
            statusCode: 200,
            data: updateAddress
        }
        
    } catch (error) {
        console.log("Error:", error)
        throw error
    }
}

async function deleteAddressByid(addressId){
    try {
        const address = getAddressByAddressId(addressId)

        if (!address) {
            return {
                dateTime: dateTime.getCurrentDateTime,
                message: "Something went wrong, Unable to find the Id!",
                statusCode: 404
            }
        }

        const data = await addressRepository.deleteAddressByid(addressId)

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: "Deleted address successfully!",
            statusCode: 200,
            data: data
        }

    } catch (error){
        console.log("Error:", error)
        throw error
    }
}

module.exports = {
    getListOfAdress,
    getAddressByAddressId,
    createNewAddress,
    updateAddressById,
    deleteAddressByid
}