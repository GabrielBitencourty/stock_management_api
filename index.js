const express = require('express');
const app = express();
const port = 8080
const date = new Date().toLocaleString("pt-BR");
const cors = require("cors")
require("dotenv").config();

const databaseConnection = require('./src/data/mongodb.js')
const users = require('./src/users/userRoutes.js')
const auth = require('./src/authentication/authRoutes.js')
const products = require('./src/products/productsRoutes.js')
const clients = require('./src/clients/clientsRouter.js')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use('/users', users);
app.use('/authentication', auth)
app.use('/products', products)
app.use('/clients', clients)
databaseConnection()

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})