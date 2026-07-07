const mongoose = require("mongoose")

async function databaseConnection(params) {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.brdx4q5.mongodb.net/?appName=Cluster0`)
        console.log("Connected to the database!")
    } catch (err){
        console.log(`Usuario: ${process.env.MONGO_DB_USER_NAME} Senha:${process.env.MONGO_DB_PASSWORD}`)
        console.error("Connection failed to the DB", err)
        process.exit(1)
    }
}

module.exports = databaseConnection