const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: "string",
        required: true
    },
    description: {
        type: 'string'
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
        type: "string",
        required: true
    }
})

module.exports = Expense = mongoose.model('expense', ExpenseSchema)