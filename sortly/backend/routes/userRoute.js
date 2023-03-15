const express = require("express");
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    logout, 
    getUser,
    loginStatus, 
    updateUser,
} = require("../controllers/userController");
const protect = require("..//middleWare/authMiddleWare.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateUser", protect, updateUser);

module.exports = router;