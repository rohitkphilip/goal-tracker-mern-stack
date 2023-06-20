const express = require('express')
const router = express.Router()

const { 
    getUsers,
    registerUser, 
    loginUser,
    getMe
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware') //middleware to check for token

// api/users
router.route('/').get(getUsers) //for testing
router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(protect, getMe)

module.exports = router