const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    email: String,
    password: String,
    state: String,
    userAccess: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;