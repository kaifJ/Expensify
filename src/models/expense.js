const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
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