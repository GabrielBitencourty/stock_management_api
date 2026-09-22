const express = require('express')
const auth = express.Router()
const authController = require('./authController.js')
const tokenVerification = require('../midleware/tokenVerification.js')

auth.post('/signin', authController.signIn)
auth.post('/signup', authController.signUp)
auth.delete('/delete/:userEmail', authController.deleteMyAccount)
auth.post('/passwordRecovery/:userEmail', authController.passwordRecovery)
auth.post('/emailValidation', authController.emailValidation)
auth.post('/validateToken', tokenVerification, authController.validateToken)

module.exports = auth