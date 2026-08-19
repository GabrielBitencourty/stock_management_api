const userService = require("./userServices")
const express = require('express')
const dateTime = require('../utils/datetimeFormat');
const validateUserToken = require("../utils/validateUserToken");

async function getAllUsers(req, res) {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
}

async function getUserByEmail(req, res) {
    const { userEmail } = req.params;

    if (!userEmail) {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1",
        })
    }

    const userByIdResult = await userService.getUserByEmail(userEmail)
    res.status(userByIdResult.statusCode || 200).json(userByIdResult)
}

async function getTokenForUser(req, res) {
    const { email } = req.params
    const basicToken = req.headers.authentication

    if (!basicToken) {
        return res.status(401).json({
           message: "Bad request, Unauthorized!",
           version: "0.0.1", 
           requestTime: dateTime.getCurrentDateTime(),
        })
    }

    validateUserToken(basicToken)

    if (!email || email == ":email") {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1",
        })
    }

    const tokenResponse = await userService.getTokenForUser(email)
    res.status(tokenResponse.statusCode || 200).json(tokenResponse)
}

async function createNewUser(req, res) {
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password

    if (!userName || !email || !password) {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1",
        })
    }

   const createUserResult = await userService.createNewUser(req.body)
   res.status(createUserResult.statusCode || 201).json(createUserResult)
}

async function updateUserByEmail(req, res) {
    const userName = req.body.userName
    const userEmail = req.body.email
    const userState = req.body.state
    const userAccess = req.body.userAccess

    if(!userName || !userState || !userAccess || !userEmail) {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1",
        })
    }

    const updateUserResult = await userService.updateUserByEmail(req.body)
    return res.status(updateUserResult.statusCode || 201).json(updateUserResult)
}

async function deleteUser(req, res){
 const { userEmail } = req.params;

    if (!userEmail) {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            version: "0.0.1",
        })
    }

    const deleteUserResult = await userService.deleteUser(userEmail)
    res.status(deleteUserResult.statusCode || 200).json(deleteUserResult)
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getTokenForUser,
    createNewUser,
    updateUserByEmail,
    deleteUser
}