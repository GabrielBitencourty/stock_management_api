const user = require('../model/User')

async function deleteMyAccount(userEmail) {
    const deleteRequest = await user.deleteOne({
        email: userEmail
    })

    return deleteRequest 
}

module.exports = {
    deleteMyAccount
}