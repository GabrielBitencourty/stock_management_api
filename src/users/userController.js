const userService = require("./userServices")
const express = require('express')
const dateTime = require('../utils/datetimeFormat')

async function getAllUsers(req, res) {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
}

function getUserById(req, res) {
    const { userId } = req.params;
    const user = userService.getUserById(userId)
    res.status(200).json(user)
}

function getTokenForUser(req, res) {
    const { email } = req.params;
    const token = userService.getTokenForUser(email)
    res.status(200).json(token)
}

async function createNewUser(req, res) {
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password

    if (!userName || !email || !password) {
        return res.status(400).json({
            message: "Bad request, missing required fields!",
            requestTime: dateTime.getCurrentDateTime(),
            httpCode: 400,
            version: "0.0.1",
        })
    }

   const createUserResult = await userService.createNewUser(req.body)
   res.status(createUserResult.statusCode || 201).json(createUserResult)
}

module.exports = {
    getAllUsers,
    getUserById,
    getTokenForUser,
    createNewUser
}