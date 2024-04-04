const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please include a username."]
    },
    email: {
        type: String,
        required: [true, "Please include an email address."],
        unique: [true, "That email address is already in use."]
    },
    password: {
        type: String,
        required: [true, "You must specify a password."]
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);