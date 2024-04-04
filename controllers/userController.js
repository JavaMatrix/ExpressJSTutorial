const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

//@desc Register a new user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)

    let user = {};
    try {
        user = await User.create({ username, email, password: hashedPassword });
    } catch (e) {
        res.status(400);
        throw e;
    }

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid.");
    }
});


const INVALID_USERNAME_OR_PASSWORD = "Invalid user or password.";

//@desc Log a user in.
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { userident, password } = req.body;
    console.log(userident)
    const user = await User.findOne({ email: userident }) || await User.findOne({ username: userident });
    if (!user) {
        res.status(401);
        throw new Error(INVALID_USERNAME_OR_PASSWORD);
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error(INVALID_USERNAME_OR_PASSWORD);
    }

    let accessToken = {}

    try {
        accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
    } catch (e) {
        res.status(500);
        throw e;
    }

    res.status(200).json({ accessToken });
});

//@desc Get information about the currently logged in user.
//@route POST /api/users/current
//@access private
const getCurrentUserInfo = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getCurrentUserInfo }