const dateTime = require('../utils/datetimeFormat')
const userServices = require('../users/userServices')
const user = require('../model/User')
const userRepository = require('../users/userRepository')
const authRepository = require('./authRepository')
const passwordValidation = require('../utils/passwordValidation')
const generateUserToken = require('../utils/generateUserToken')

async function signIn(body){
    try {
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
            message: "Login successful!",
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
    } catch (error) {
        throw new Error(error.message);
        console.log("Error: ", error.message)
    }
}

async function signUp(body){
    
}

async function passwordRecovery(body){

}

async function emailValidation(body){

}

async function deleteMyAccount(userEmail) {
    try {
        const valideEmail = await user.findOne({email: userEmail})

        if(!valideEmail){
           return {
                message: "Unauthorized, Not authorized to proceed with the request.",
                requestTime: dateTime.getCurrentDateTime(),
                statusCode: 401,
                version: "0.0.1",
            }
        }

        return {
            message: "Delete process successful!",
            requestTime: dateTime.getCurrentDateTime(),
            statusCode: 200,
            version: "0.0.1",
            user: await authRepository.deleteMyAccount(userEmail)
        };

    } catch (error) {
        throw new Error(error.message)
        console.log("Error:", error.message)
    }
}

module.exports = {
    signIn,
    signUp,
    passwordRecovery,
    deleteMyAccount,
    emailValidation
}