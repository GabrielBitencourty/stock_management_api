const userService = require("./userServices")
const express = require('express')

function getAllUsers(req, res) {
    const users = userService.getAllUsers()
    res.status(200).json(users)
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

module.exports = {
    getAllUsers,
    getUserById,
    getTokenForUser
}