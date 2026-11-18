const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

process.env.JWT_SECRET = 'integration-test-secret'

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    process.env.MONGODB_URI = mongoServer.getUri()
    await mongoose.connect(process.env.MONGODB_URI)
})

afterEach(async () => {
    await Promise.all(
        Object.values(mongoose.connection.collections).map((collection) => collection.deleteMany({}))
    )
})

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect()
    }

    if (mongoServer) {
        await mongoServer.stop()
    }
})
