const express = require('express')
const auth = express.Router()
const authController = require('./authController.js')
const tokenVerification = require('../midleware/tokenVerification.js')
const validateSchema = require('../middlewares/validateSchema.js')
const { signinSchema, signupSchema } = require('../schemas/authSchemas.js')

auth.post('/signin', validateSchema({ body: signinSchema }), authController.signIn)
auth.post('/signup', validateSchema({ body: signupSchema }), authController.signUp)
auth.delete('/delete/:userEmail', authController.deleteMyAccount)
auth.post('/passwordRecovery/:userEmail', authController.passwordRecovery)
auth.post('/emailValidation', authController.emailValidation)
auth.post('/validateToken', tokenVerification, authController.validateToken)

module.exports = auth