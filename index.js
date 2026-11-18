require("dotenv").config();

const mongoose = require('mongoose')
const app = require('./src/app.js')
const databaseConnection = require('./src/data/mongodb.js')

async function startServer() {
    await databaseConnection()

    const port = process.env.PORT || 8080
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })

    let shuttingDown = false
    const shutdown = (signal) => {
        if (shuttingDown) {
            return
        }

        shuttingDown = true
        console.log(`${signal} received; shutting down gracefully`)
        server.close(async (error) => {
            if (error) {
                console.error('Error closing HTTP server:', error)
                process.exitCode = 1
            }

            try {
                await mongoose.connection.close()
                console.log('MongoDB connection closed')
            } catch (closeError) {
                console.error('Error closing MongoDB connection:', closeError)
                process.exitCode = 1
            }
        })
    }

    process.on('SIGINT', () => shutdown('SIGINT'))
    process.on('SIGTERM', () => shutdown('SIGTERM'))
}

startServer().catch((error) => {
    console.error('Failed to start server:', error)
    process.exitCode = 1
})