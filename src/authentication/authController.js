const dateTime = require('../utils/datetimeFormat')
const express = require('express')
const authService = require('./authServices')

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

module.exports = {
    signIn
}