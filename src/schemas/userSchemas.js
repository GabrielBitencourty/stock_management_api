const { z } = require('zod')
const { objectIdParamsSchema } = require('./commonSchemas.js')

const createUserSchema = z.object({
    userName: z.string().trim().min(1),
    email: z.string().email(),
    password: z.string().min(8)
})

const userIdParamsSchema = objectIdParamsSchema('userId')

module.exports = {
    createUserSchema,
    userIdParamsSchema
}
