const bcrypt = require('bcrypt')
const config = require('config')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const router = express.Router()

/*
    Register User
    Post Method
*/
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Minimum Length of password is 6')
],async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    } 
    
    const { email, name, password } = req.body
    try {
        
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({errors: [{
                msg: 'User already exists'
            }]})
        }
        
        const salt = await bcrypt.genSalt(10)

        user = new User({
            email,
            password,
            name
        })

        user.password = await bcrypt.hash(password, salt)
        
        const jwtPayload = {
            user:{
                id: user.id
            }
        }
       
        jwt.sign(
            jwtPayload, 
            config.get('JSONwebtokenSecretKey'), 
            { expiresIn: '8760d' },
            (err, token) => {
                if(err) throw new err
                user.tokens = user.tokens.concat({ token })
            }
        )
        console.log(user)
        await user.save()
        res.json({ token: user.tokens.slice(-1)[0].token }) 
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

/*
    Sing Out
    Post Method
*/
router.post('/logout', auth, async(req,res) => {
    try {
        let user = await User.findOneAndUpdate({_id: req.user.id}, {tokens: []}, { new: true })
        res.send('Logged out')
    } catch (error) {
        res.status(500).json({errors: [error], msg: 'Server Error'})
    }
})

module.exports = router
