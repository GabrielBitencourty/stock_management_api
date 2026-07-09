const user = require('../model/User.js');

async function getAllUsers() {
    const users = await user.find({});
    return users;
}
 
async function createNewUser(payload) {
    const newUser = await user.create(payload)
    return newUser
}

module.exports = {
    getAllUsers,
    createNewUser
};