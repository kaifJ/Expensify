const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async function(req, res, next){
    const token = req.header('Authorization')
    
    try {
        if(!token){
            return res.status(401).send('Authorization Denied')
        }

        const decoded = await jwt.verify(token, config.get('JSONwebtokenSecretKey'))
        req.user = decoded.user
        next()
    } catch (error) {
        return res.status(401).send('Authorization Denied')
    }
}