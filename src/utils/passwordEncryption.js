const bcrypt = require("bcrypt");
const saltRounds = 10;

async function passwordEncryption(userPassword) {
    try {
        const encryptedPassword = await bcrypt.hash(userPassword, saltRounds);
        return encryptedPassword;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = passwordEncryption;