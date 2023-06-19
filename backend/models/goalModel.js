const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        text:{
            type:String,
            required: [true, 'Please add a text value']
        }
    },
    {
        timestamps: true
    }
)

const userModel = mongoose.model('GoalModel', goalSchema)

module.exports = userModel

