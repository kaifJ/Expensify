const bcrypt = require('bcrypt')
const config = require('config')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const { check, validationResult } = require('express-validator')

const router = express.Router()

/*
    Sign in User
*/
router.post('/', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').exists()
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(400).send('Wrong Credentials')
        }

        if(bcrypt.compare(password, user.password)){
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
                    if(err) throw new Error(err)
                    user.tokens = user.tokens.concat({ token })
                }
            )
                
            await user.save()
            res.json({ token: user.tokens.slice(-1)[0].token }) 
        }else res.status(400).send('Wrong Credentials')

        return res

    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

module.exports = router