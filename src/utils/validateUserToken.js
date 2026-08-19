async function validateUserToken(token) {
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        return {
            valid: true,
            user: decoded
        };

    } catch (error) {
        return {
            valid: false,
            message: "Invalid or expired token"
        };
    }
}

module.exports = validateUserToken;