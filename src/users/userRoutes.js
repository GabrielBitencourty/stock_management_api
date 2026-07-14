const express = require('express')
const user = express.Router()
const userController = require("./userController.js")

user.get('/', userController.getAllUsers)
user.get('/:userEmail', userController.getUserByEmail)
user.get('/:email/gettoken', userController.getTokenForUser)
user.post('/', userController.createNewUser)

module.exports = user