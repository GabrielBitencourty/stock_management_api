const AppError = require('../utils/AppError.js')

function validateSchema(schemas = {}) {
    return function validateRequest(req, res, next) {
        for (const location of ['body', 'params']) {
            const schema = schemas[location]
            if (!schema) {
                continue
            }

            const result = schema.safeParse(req[location])
            if (!result.success) {
                const message = result.error.issues
                    .map((issue) => {
                        const field = issue.path.length
                            ? `${location}.${issue.path.join('.')}`
                            : location
                        return `${field}: ${issue.message}`
                    })
                    .join('; ')

                return next(new AppError(message, 400))
            }

            req[location] = result.data
        }

        return next()
    }
}

module.exports = validateSchema
