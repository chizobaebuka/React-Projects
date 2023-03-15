const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};


// Registers user
const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    // ensuring the user didn't omit some requirments
    if(!name || !email || !password){
        res.status(400)
        throw new Error ("Please fill in all required fields")
    }
    if(password.length < 6){
        res.status(400)
        throw new Error ("Password must be up to 6 characters")
    }
    // check if user email already exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error ("email has already been registered")
    }
   
    // creating new user
    const user = await User.create({
        name, 
        email,
        password,
    })

    // Generate tOken
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none", 
        secure: true
    });

    if(user) {
        const { _id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio, token,
        });
    } else{ 
        res.status(400)
        throw new Error ("Invalid user data")
    }
});

// Login the user
const loginUser = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body
    // Validate request
    if (!email || !password){
        res.status(400);
        throw new Error ("Please add email and password");
    }

    // checking if the user exists in the DB
    const user = await User.findOne({email})
    if (!user){
        res.status(400);
        throw new Error ("User not found please sign up ");
    }

    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    // Generate token using the user id
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none", 
        secure: true
    });

    if(user && passwordIsCorrect){
        const { _id, name, email, photo, phone, bio} = user
        res.status(200).json({
            _id, name, email, photo, phone, bio, token,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid email or password");
    }

});

// Logout user
const logout = asyncHandler (async (req, res) => {
    // Send HTTP-only cookie
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none", 
        secure: true
    });
    return res.status(200).json({ message: 'Successfully Logged Out ' });
});

// Get User Data
const getUser = asyncHandler (async (req, res) => {
    const user = user.findById(req.user._id);
    if(user){
        if(user){
            const { _id, name, email, photo, phone, bio} = user
            res.status(200).json({
                _id, name, email, photo, phone, bio, 
            });
        }
        else {
            res.status(400);
            throw new Error("User Not Found");
        }
    
    }
})
    
module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
};