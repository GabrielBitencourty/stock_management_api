const usersData = require('../data/users.json')
const userRepository = require('./userRepository.js')
const user = require('../model/User.js');
const dateTime = require('../utils/datetimeFormat.js')
const passwordEncryption = require('../utils/passwordEncryption.js');
const { default: mongoose } = require('mongoose');

async function getAllUsers() {
    try {
        return {
            requestTime: dateTime.getCurrentDateTime(),
            status: 'Success: API is running',
            version: '1.0.0',
            Users: await userRepository.getAllUsers()
        };
    } catch (error) {
        throw new Error(error.message);
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
    }
}

module.exports = {
    getAllUsers,
    createNewUser
}