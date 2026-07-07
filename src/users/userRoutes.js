const express = require('express')
const user = express.Router()
const userController = require("./userController.js")

user.get('/', userController.getAllUsers)
user.get('/:userId', userController.getUserById)
user.get('/:email/gettoken', userController.getTokenForUser)

module.exports = user