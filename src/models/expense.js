const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

module.exports = Expense = mongoose.model('expense', ExpenseSchema)