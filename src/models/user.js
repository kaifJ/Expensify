const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

UserSchema.virtual('expense', {
    ref: 'Expense',
    localField: '_id',
    foreignField: 'user'
})

module.exports = User = mongoose.model('user', UserSchema)