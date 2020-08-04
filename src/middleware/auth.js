const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/user')

module.exports = async function(req, res, next){
    const token = req.header('Authorization')
    
    try {
        if(!token){
            return res.status(401).send('Authorization Denied')
        }

        const decoded = await jwt.verify(token, config.get('JSONwebtokenSecretKey'))
        
        const user = await User.findOne({id: decoded.id, 'tokens.token': token})
        if(!user){
            return res.status(400).send('Authorization Denied')
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).send('Authorization Denied')
    }
}