const bcrypt = require("bcrypt");

async function passwordValidation(userPassword, dbPassword) {
    try {
        const passwordValidated = await bcrypt.compare(userPassword, dbPassword)
        return passwordValidated
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = passwordValidation