const express = require('express');
const app = express();
const port = 8080
const date = new Date().toLocaleString("pt-BR");
const cors = require("cors")
require("dotenv").config();

const databaseConnection = require('./src/data/mongodb.js')
const users = require('./src/users/userRoutes.js')
const auth = require('./src/authentication/authRoutes.js')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use('/users', users);
app.use('/authentication', auth)
databaseConnection()

app.get('/', (req, res) => {
    res.status(200).json({
        requestTime: date,
        status: 'Success: API is running!',
        version: '1.0.0',  
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})