const bcrypt = require('bcrypt')
const config = require('config')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
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
        
        // const salt = await bcrypt.genSalt(10)
        bcrypt.genSalt(config.get('salt')).then(async salt => {
            password = await bcrypt.hash(password, salt)
        })

        user = new User({
            email,
            password,
            name
        })
        
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
        
        await user.save()
        res.json({ token: user.tokens.slice(-1)[0].token }) 
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

module.exports = router
