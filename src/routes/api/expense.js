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
    const queries = req.query
    try {
        const expenses = await Expense.find({user: req.user.id}).setOptions({
            limit: queries.limit || 10, 
            skip: queries.skip || 0, 
            sort:{
                'date': -1
            }
        })

        res.send(expenses)
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
router.get('/search', auth, async(req, res) => {
    try {
        let filter = { user: req.user.id }
        for(let [field,value] of Object.entries(req.query)){
            if(field === 'limit' || field === 'skip') continue

            if (field === 'minAmount' || field === 'maxAmount') {
                filter = filter.hasOwnProperty('amount')
                  ? filter
                  : Object.assign(filter, {
                      amount: {
                        $gte: req.query['minAmount'] || 0,
                        $lte: req.query['maxAmount'] || 1000000000000000000
                      }
                    })
            }else if(field === 'month'){
                // Have Think about this. See how the input is given from the component
                continue
            }else{
                filter = Object.assign(filter, {
                    [field]: value
                })
            }
             
        }
        
        let expenses = await Expense.find(filter).setOptions({
            limit: req.query.limit || 10, 
            skip: req.query.skip || 0
        })
        
        res.send(expenses)
    } catch (error) {
        res.status(500).json({errors:[error], msg:'Server Error'})
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
            user: req.user.id,
            title: title.trim().toLowerCase(),
            description,
            date,
            amount: amount.toFixed(2),
            category: category.trim().toLowerCase()
        })
        
        await expense.save()
        res.send(expense)
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
       
        res.send(expense)

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
        res.status(500).json({errors: error, msg: 'Server Error'})
    }
})

module.exports = router