const { z } = require('zod')

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Must be a valid MongoDB ObjectId.')

function objectIdParamsSchema(paramName) {
    return z.object({
        [paramName]: objectIdSchema
    })
}

module.exports = {
    objectIdSchema,
    objectIdParamsSchema
}
