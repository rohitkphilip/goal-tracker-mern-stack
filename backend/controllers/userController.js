const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc     Get users - For testing
// @route    GET /api/users
// @access   Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

// @desc     Register user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        // res.status(400).json({message: 'Please add a text field'})
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({ email })
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @desc     Authenticate user
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    // if (!email || !password) {
    //     // res.status(400).json({message: 'Please add a text field'})
    //     res.status(400)
    //     throw new Error('Please add email and password')
    // }

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials")
    }

    
})


// @desc     Get user data
// @route    GET /api/users/me
// @access   Private
const getMe = asyncHandler (async (req, res) => {
    // res.status(200).json({message: "GET ME"})

    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name: name,
        email: email
    })
})


//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    getMe,
}




