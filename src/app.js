const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler.js')

const users = require('./users/userRoutes.js')
const auth = require('./authentication/authRoutes.js')
const products = require('./products/productsRoutes.js')
const clients = require('./clients/clientsRouter.js')
const address = require('./address/addressRouter.js')

const app = express()

app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())

app.use('/users', users)
app.use('/authentication', auth)
app.use('/products', products)
app.use('/clients', clients)
app.use('/address', address)

app.use(errorHandler)

module.exports = app
