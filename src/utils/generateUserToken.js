const jwt = require("jsonwebtoken")

async function userTokenGeneration(user) {
    const token = jwt.sign(
        {
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "4h"
        }
    );

    return token;

}

module.exports = userTokenGeneration