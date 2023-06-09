const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/unauthenticated')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication failed')
    }
    const token = authHeader.split(' ')[1]
    try {
       const payload = jwt.verify(token, process.env.JWT_SECRET) 
       req.user = {userId: payload.userId, name: payload.name}
       //alternative:
       //const user = User.findById(payload.id).select('-password')
       //req.user = user;
       next()
    } catch (error) {
       throw new UnauthenticatedError('Authentication invalid') 
    }
}

module.exports = auth;
