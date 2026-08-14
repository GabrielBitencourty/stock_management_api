const dateTime = require('../utils/datetimeFormat')
const express = require('express')
const authService = require('./authServices')
const userServices = require('../users/userServices')

async function signIn(req, res) {
    const userEmail = req.body.email
    const userPassword = req.body.password

    if (!userEmail || !userPassword) {
       return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            statusCode: 400,
            version: "0.0.1",
       })
    }
    
    const signInResponse = await authService.signIn(req.body)
    res.status(signInResponse.statusCode || 200).json(signInResponse)
}

async function signUp(req, res){
    const { userEmail, userName, password, confirmPassword } = req.body

    if (!userEmail ||!userName ||!password  ||!confirmPassword) {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            statusCode: 400,
            version: "0.0.1",
        })
    }

    if (confirmPassword !== password) {
        return res.status(400).json({
            message: "Bad request, passwords do not match!",
            requestTime: dateTime.getCurrentDateTime(),
            statusCode: 400,
            version: "0.0.1",
        })
    }

    const payload = {
        userName,
        email: userEmail,
        password
    }

    const signInPayload = {
        email: userEmail,
        password
    }

    const signUpResult = await userServices.createNewUser(payload)
    if(signUpResult.statusCode === 409){
        return res.status(409).json(signUpResult)
    }

    const signInResult = await authService.signIn(signInPayload)
    res.status(signInResult.statusCode).json(signInResult)
}

async function passwordRecovery(req, res){

}

async function deleteMyAccount(req, res) {
    const userEmail = req.params.userEmail

    if (!userEmail || userEmail == ":userEmail") {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            statusCode: 400,
            version: "0.0.1",
        })
    }

    const userDeleteResult = await authService.deleteMyAccount(userEmail)
    res.status(userDeleteResult.statusCode || 202).json(userDeleteResult)
}

async function emailValidation(req, res){

}

module.exports = {
    signIn,
    signUp,
    passwordRecovery,
    deleteMyAccount,
    emailValidation
}