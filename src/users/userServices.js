const userRepository = require('./userRepository.js')
const user = require('../model/User.js');
const dateTime = require('../utils/datetimeFormat.js')
const passwordEncryption = require('../utils/passwordEncryption.js');
const { default: mongoose } = require('mongoose');
const generateUserToken = require('../utils/generateUserToken.js')
const generateAccessToken = require('../utils/generateAccessToken.js')

async function getAllUsers() {
    try {
        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Success: API is running',
            version: '1.0.0',
            Users: await userRepository.getAllUsers()
        };
    } catch (error) {
        throw new Error(error.message)
        console.log("Error Message: ",  error.message)
    }
}

async function getUserByEmail(userEmail){
    try {
        const userId = userEmail
        const userData = await userRepository.getUserByEmail(userId)

        if (!userId || !userData) {
            return {
                requestTime: dateTime.getCurrentDateTime(),
                status: 'User not found in our Database!',
                statusCode: 404,
                version: '1.0.0',
            }
        }

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Success: user founded!',
            version: '1.0.0',
            userData 
        }    
    } catch (error) {
        throw new Error(error.message)
        console.log("Error Message: ",  error.message)
    }
}

async function createNewUser(body) {
    try {
        const userName = body.userName
        const userEmail = body.email
        const userPassword = body.password

        const newPassword = await passwordEncryption(userPassword)

        const dbUser = await user.findOne({
            $or: [
                { userName: userName },
                { email: userEmail }
            ]
        })

        if (dbUser) {
            return {
                message: "User already exist!",
                version: "1.0.0",
                requestTime: dateTime.getCurrentDateTime(),
                statusCode: 409,
            }
        }

        const payload = {
            _id: new mongoose.Types.ObjectId(),
            userName: userName,
            email: userEmail,
            password: newPassword,
            state: "active",
            userAccess: "user"
        }

        const createdUser = await userRepository.createNewUser(payload)

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: "User created successfully!",
            version: "1.0.0",
            data: createdUser
        }

    } catch (error) {
        throw new Error(error.message)
        console.log("Error Message: ", error.message)
    }
}

async function updateUserByEmail(body) {
    try {
        const userEmail = body.email

        const userExist = await user.findOne({
            email: userEmail
        })

        if(!userExist) {
            return {
                message: `User ${userEmail} not exist in our database`,
                version: "1.0.0",
                requestTime: dateTime.getCurrentDateTime(),
                statusCode: 400,
            }
        }

        const updateUserResponse = await userRepository.updateUserByEmail(body)

        if (!updateUserResponse) {
             return {
                message: `Failed to update the user ${userEmail}`,
                version: "1.0.0",
                requestTime: dateTime.getCurrentDateTime(),
                statusCode: 400,
            }
        }

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: `User ${userEmail} updated successfully!`,
            version: "1.0.0",
            data: updateUserResponse
        }

    } catch (error) {
        throw new Error(error.message)
        console.log("Error Message: ", error.message)
    }    
}

async function deleteUser(email) {
    try {
        const userEmail = email

        const userExist = await user.findOne({
            email: userEmail
        })

        if(!userExist) {
            return {
                message: `User ${userEmail} not exist in our database`,
                version: "1.0.0",
                requestTime: dateTime.getCurrentDateTime(),
                statusCode: 400,
            }
        }
        
        const userId = userExist._id
        const deleteUserResponse = await userRepository.deleteUser(userId)

        if (!deleteUserResponse) {
             return {
                message: `Failed to delete the user ${userEmail}`,
                version: "1.0.0",
                requestTime: dateTime.getCurrentDateTime(),
                statusCode: 400,
            }
        }

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: `User ${userEmail} has been deleted!`,
            version: "1.0.0",
        }

    } catch(error){
        throw new Error(error.message)
        console.log("Error Message: ", error.message)
    }
}

async function getUser(userEmail){
    try {
        const userId = userEmail
        const userData = await userRepository.getUser(userId)

        if (!userId || !userData) {
            return {
                requestTime: dateTime.getCurrentDateTime(),
                status: 'User not found in our Database!',
                statusCode: 404,
                version: '1.0.0',
            }
        }

        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Success: user founded!',
            version: '1.0.0',
            userData
        }    
    } catch (error) {
        throw new Error(error.message)
        console.log("Error Message: ",  error.message)
    }
}

async function getTokenForUser(userEmail) {
 try {
    const verifyEmail = await user.findOne({email: userEmail})

    if (verifyEmail === null) {
        return {
            requestTime: dateTime.getCurrentDateTime(),
            message: 'Unable to get token for user!',
            statusCode: 404,
            version: '1.0.0',
        }
    }

    const token = await generateUserToken(userEmail)
    return {
        message: "Token successful created!",
        token: token,
        requestTime: dateTime.getCurrentDateTime(),
        version: "0.0.1"
    };

 } catch (error) {
    throw new Error(error.message)
    console.log("Erro:", error.message)
 }
}

async function getAccessToken(email) {
    try {
        const verifyEmail = await user.findOne({email: email})

        if (verifyEmail === null) {
            return {
                requestTime: dateTime.getCurrentDateTime(),
                message: 'Unable to get token for user!',
                statusCode: 404,
                version: '1.0.0',
            }
        }

        const token = await generateAccessToken(email)
        return {
            message: "Token successful created!",
            token: token,
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1"
        };

    } catch (error) {
        throw new Error(error.message)
        console.log("Error:", error.message)
    }
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    createNewUser,
    updateUserByEmail,
    getUser,
    deleteUser,
    getTokenForUser,
    getAccessToken
}