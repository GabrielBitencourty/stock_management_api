const express = require('express')
const auth = express.Router()
const authController = require("./authController.js")

auth.post('/signin', authController.signIn)

module.exports = auth