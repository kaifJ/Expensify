const bcrypt = require('bcrypt')
const config = require('config')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const { check, validationResult } = require('express-validator')

const router = express.Router()

//test route
// router.get('/', (req,res) => {
//     res.send('Hello There')
// })

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
        
        await user.save()

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
                res.json({ token })
            }
        )
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

module.exports = router
