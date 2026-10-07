const express = require('express');
const app = express();
const port = 8080
const cors = require("cors")
require("dotenv").config();

const databaseConnection = require('./src/data/mongodb.js')
const users = require('./src/users/userRoutes.js')
const auth = require('./src/authentication/authRoutes.js')
const products = require('./src/products/productsRoutes.js')
const clients = require('./src/clients/clientsRouter.js');
const address = require('./src/address/addressRouter.js');

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use('/users', users);
app.use('/authentication', auth)
app.use('/products', products)
app.use('/clients', clients)
app.use('/address', address)
databaseConnection()

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})