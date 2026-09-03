const jwt = require("jsonwebtoken");
const dateTime = require('../utils/datetimeUtils.js')

function validateToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token not provided",
                requestTime: dateTime.getCurrentDateTime(),
                version: '1.0.0',
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Invalid Token!",
                requestTime: dateTime.getCurrentDateTime(),
                version: '1.0.0',
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            requestTime: dateTime.getCurrentDateTime(),
            version: '1.0.0',
        });
    }
}

module.exports = validateToken;