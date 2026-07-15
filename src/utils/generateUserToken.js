const jwt = require("jsonwebtoken")

async function userTokenGeneration(user) {
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            userAccess: user.userAccess
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

    return token;

}

module.exports = userTokenGeneration