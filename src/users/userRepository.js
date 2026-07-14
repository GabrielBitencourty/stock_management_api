const user = require('../model/User.js');

async function getAllUsers() {
    const users = await user.find({});
    return users;
}
 
async function createNewUser(payload) {
    const newUser = await user.create(payload)
    return newUser
}

async function getUserByEmail(userid) {
    const uniqueUser = await user.findOne({
        email: userid
    })

    if (!uniqueUser){
        return null
    }

    const userObj = {
        userEmail: uniqueUser.email,
        userName: uniqueUser.userName ,
        userAccess: uniqueUser.userAccess,
        userState: uniqueUser.state

    }
    return userObj
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    createNewUser
};