const express = require("express");
const { registerUser, loginUser, getCurrentUserInfo } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", getCurrentUserInfo);

module.exports = router;