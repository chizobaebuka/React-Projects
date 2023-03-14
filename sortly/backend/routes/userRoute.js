const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout } = require("../controllers/userController")

// const registerUser = () => {};

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", getUser);

module.exports = router;