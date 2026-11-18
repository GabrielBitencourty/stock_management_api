const express = require('express')
const user = express.Router()
const userController = require("./userController.js")
const tokenVerification = require('../midleware/tokenVerification.js')
const validateSchema = require('../middlewares/validateSchema.js')
const { createUserSchema, userIdParamsSchema } = require('../schemas/userSchemas.js')

user.get('/', tokenVerification, userController.getAllUsers)
user.get('/:userEmail', tokenVerification, userController.getUserByEmail)
user.get('/getUserById/:userId', tokenVerification, validateSchema({ params: userIdParamsSchema }), userController.getUserById)
user.get('/:email/gettoken', userController.getTokenForUser)
user.get('/:email/getAccessToken', userController.getAccessToken)
user.post('/', tokenVerification, validateSchema({ body: createUserSchema }), userController.createNewUser)
user.put('/updateUser', tokenVerification, userController.updateUserByEmail)
user.delete('/deleteUser/:userEmail', tokenVerification, userController.deleteUser)

module.exports = user