const user = require('../model/User.js');

async function getAllUsers() {
    const users = await user.find({});

    const usersObj = users.map((user) => {
        return {
            userName: user.userName,
            email: user.email,
            state: user.state,
            userAccess: user.userAccess
        }
    })

    return usersObj
}
 
async function createNewUser(payload) {
    const newUser = await user.create(payload)
    
    const newUserObj = {
        userName: newUser.userName,
        email: newUser.email,
        state: newUser.state,
        userAccess: newUser.userAccess
    } 

    return newUserObj
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

async function getUser(userEmail){
    const uniqueUser = await user.findOne({
        email: userEmail
    })

    if (!uniqueUser){
        return null
    }

    return uniqueUser
}

async function updateUserByEmail(payload) {
    const userUpdate = await user.updateOne(
        {email: payload.email},
        {
            userName: payload.userName,
            state: payload.state,
            userAccess: payload.userAccess
        }
    )

    const userUpdated = await user.findOne({
        email: payload.email
    })

    if (!userUpdated){
        return null
    }

    const updatedUserObj = {
        userName: userUpdated.userName,
        email: userUpdated.email,
        state: userUpdated.state,
        userAccess: userUpdated.userAccess
    } 

    return updatedUserObj
}

async function deleteUser(userID) {
    const deleteUserRequest = await user.deleteOne({
        _id: userID
    })

    return deleteUserRequest
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    createNewUser,
    updateUserByEmail,
    getUser,
    deleteUser
};