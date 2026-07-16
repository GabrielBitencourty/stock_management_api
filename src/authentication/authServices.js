const dateTime = require('../utils/datetimeFormat')
const userServices = require('../users/userServices')
const userRepository = require('../users/userRepository')
const passwordValidation = require('../utils/passwordValidation')
const generateUserToken = require('../utils/generateUserToken')

async function signIn(body){
    const userEmail = body.email
    const userPassword = body.password
    const userExist = await userServices.getUser(userEmail)

    if (userExist.statusCode == 404){
        return userExist
    }

    const userState = userExist.userData.state
    if(userState === "deactivated"){
        return {
            message: "Unauthorized, this user has been deactivated!",
            requestTime: dateTime.getCurrentDateTime(),
            statusCode: 403,
            version: "0.0.1"
        }
    }


    const dbPassword = userExist.userData.password
    const passwordValidated = await passwordValidation(userPassword, dbPassword)

    if (!passwordValidated) {
        return {
            message: "Unauthorized, Invalid email or password.",
            requestTime: dateTime.getCurrentDateTime(),
            statusCode: 401,
            version: "0.0.1",
        }
    }

    const token = await generateUserToken(userExist.userData)
    return {
        message: "Login successful.",
        token: token,
        user: {
            userName: userExist.userData.userName,
            email: userExist.userData.email,
            userAccess: userExist.userData.userAccess
        },
        requestTime: dateTime.getCurrentDateTime(),
        statusCode: 200,
        version: "0.0.1"
    };
}

async function signUp(body){
    
}

async function passwordRecovery(body){

}

async function emailValidation(body){

}

module.exports = {
    signIn,
    signUp,
    passwordRecovery,
    emailValidation
}