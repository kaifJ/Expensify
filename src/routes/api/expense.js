const bcrypt = require('bcrypt')
const config = require('config')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const auth = require('../../middleware/auth')
const Expense = require('../../models/expense')
const { check, validationResult } = require('express-validator')

const router = express.Router()

/*
    Get All expenses
    Get Method
    Requires authentication
*/
router.get('/', auth, async(req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id })
        console.log(expenses)
        res.send(expenses)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }

})

/*
    Post expense
    Post Method
    Requires authentication
*/
router.post('/', [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('amount', 'Amount is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { title, amount, category, description, date } = req.body
    try {
        const expense = new Expense({
            user: auth.id,
            title,
            description,
            date,
            amount: amount.toFixed(2),
            category
        })
        
        await expense.save()
        res.send(expense)
    } catch (error) {
        res.status(500).json({errors: error, msg: 'Server Error'})
    }
})

module.exports = router