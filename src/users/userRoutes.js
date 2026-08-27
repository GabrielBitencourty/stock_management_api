const express = require('express')
const user = express.Router()
const userController = require("./userController.js")
const User = require('../model/User.js')

user.get('/', userController.getAllUsers)
user.get('/:userEmail', userController.getUserByEmail)
user.get('/:email/gettoken', userController.getTokenForUser)
user.get('/:email/getAccessToken', userController.getAccessToken)
user.post('/', userController.createNewUser)
user.put('/updateUser', userController.updateUserByEmail)
user.delete('/deleteUser/:userEmail', userController.deleteUser)

module.exports = user