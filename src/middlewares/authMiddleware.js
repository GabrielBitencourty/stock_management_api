const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError.js')

function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization
    const bearerMatch = authorization && authorization.match(/^Bearer\s+(\S+)$/i)

    if (!bearerMatch) {
        return next(new AppError('A valid Bearer token is required.', 401))
    }

    try {
        const payload = jwt.verify(bearerMatch[1], process.env.JWT_SECRET)
        if (!payload || typeof payload !== 'object') {
            return next(new AppError('Invalid or expired token.', 401))
        }

        req.user = payload
        return next()
    } catch (error) {
        if (
            error instanceof jwt.JsonWebTokenError ||
            error instanceof jwt.TokenExpiredError ||
            error instanceof jwt.NotBeforeError
        ) {
            return next(new AppError('Invalid or expired token.', 401))
        }

        return next(error)
    }
}

module.exports = authMiddleware
