const bcrypt = require('bcrypt')
const config = require('config')
const express = require('express')
const jwt = require('jsonwebtoken')
const moment = require('moment')
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
    const queries = req.query
    let filter = {
        user: req.user.id
    }
    if(Object.keys(queries).length){
        let startDate = moment([queries.year, queries.month]).format()
        let endDate = moment(startDate).endOf('month').format()
        filter = Object.assign(filter,{
            date: {
                $gte: startDate,
                $lte: endDate
            }
        })
    }
    try {
        const expenses = await Expense.find(filter).setOptions({
            sort:{
                'date': -1
            }
        })

        res.json({expenses})
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }

})

/*
    Search Expense
    Get Method
    Required Authentication
    /search?title= &category= &minAmount= &maxAmount= &month=
*/
//  

/*
    Post expense
    Post Method
    Requires authentication
*/
router.post('/', [
    auth,
    check('amount', 'Amount is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { title, amount, category, description, date } = req.body
    try {
        const expense = new Expense({
            user: req.user.id,
            title: title,
            description,
            date,
            amount: parseFloat(amount).toFixed(2),
            category: category.trim().toLowerCase()
        })

        await expense.save()
        res.json({expense})
    } catch (error) {
        res.status(500).json({errors: error, msg: 'Server Error'})
    }
})

/*
    Update Expense
    Patch Method
    Authentication required
*/
router.patch('/:id', auth, async(req, res) => {
    let updatedValues = { title, description, category, amount, date } = req.body
    try {
        let expense = await Expense.findById(req.params.id)
        
        for(let [field, value] of Object.entries(updatedValues)){
            if(field === 'title' || field === 'category')
                value = value.trim().toLowerCase()
            expense[field] = value
        }
    
        await expense.save()
        res.json({expense})
    } catch (error) {
        res.status(500).json({errors: error, msg: 'Server Error'})
    }
})

/*
    Delete Expense
    Delete Method
    Authentication Required
*/
router.delete('/:id', auth, async(req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.send('deleted')
    } catch (error) {
        res.status(500).json({ msg: 'Server Error'})
    }
})

module.exports = router