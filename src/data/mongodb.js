const mongoose = require('mongoose')

async function databaseConnection() {
    let uri = process.env.MONGODB_URI

    if (!uri) {
        const { MONGO_DB_USER_NAME, MONGO_DB_USER_PASSWORD, MONGO_DB_NAME } = process.env
        if (MONGO_DB_USER_NAME && MONGO_DB_USER_PASSWORD && MONGO_DB_NAME) {
            const username = encodeURIComponent(MONGO_DB_USER_NAME)
            const password = encodeURIComponent(MONGO_DB_USER_PASSWORD)
            const database = encodeURIComponent(MONGO_DB_NAME)
            uri = `mongodb+srv://${username}:${password}@cluster0.brdx4q5.mongodb.net/${database}?appName=Cluster0`
        } else {
            throw new Error('Set MONGODB_URI or all legacy MongoDB environment variables.')
        }
    }

    await mongoose.connect(uri)
    console.log('Connected to the database!')
}

module.exports = databaseConnection