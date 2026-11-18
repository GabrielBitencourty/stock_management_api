const AppError = require('../utils/AppError.js')

function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error)
    }

    if (error.code === 11000) {
        return res.status(409).json({
            statusCode: 409,
            message: 'A record with the provided unique value already exists.'
        })
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            statusCode: 400,
            message: 'Request validation failed.'
        })
    }

    if (error.name === 'CastError') {
        return res.status(400).json({
            statusCode: 400,
            message: 'Invalid resource identifier.'
        })
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message
        })
    }

    console.error(error)
    const isProduction = process.env.NODE_ENV === 'production'
    const response = {
        statusCode: 500,
        message: isProduction ? 'Internal server error.' : error.message
    }

    if (!isProduction) {
        response.stack = error.stack
    }

    return res.status(500).json(response)
}

module.exports = errorHandler
