const express = require('express')
const router = express.Router()

const { 
    getGoals,
    setGoal, 
    updateGoal, 
    deleteGoal 
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware') //middleware to check for token

// api/goals

// router.get('/', getGoals)
// router.post('/', setGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)
            //or
router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router

