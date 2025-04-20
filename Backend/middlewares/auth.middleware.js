const userModel = require('../models/user.model');  // Import user model
const bcrypt = require('bcrypt');  // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');  // Import jsonwebtoken for token generation
const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blackListToken.model');  // Import blackListToken model

module.exports.authUser = async (req, res, next) => {  // Middleware function to authenticate user
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]; 

    if (!token) {  // Check if token is provided
        return res.status(401).json({ message: 'Unauthorized' });  // Return unauthorized response
    }

    const isBlackListed = await blackListTokenModel.findOne({token : token});  // Check if token is blacklisted

    if(isBlackListed) {  // If token is blacklisted
        return res.status(401).json({ message: 'Unauthorized' });  // Return unauthorized response
    }
    // Check if token is blacklisted

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token using secret key
        const user = await userModel.findById(decoded._id);  // Find user by ID from token

        req.user = user;  // Attach user to request object
        return next();  // Proceed to next middleware or route handler

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });  // Return unauthorized response if token is invalid
    }

}

module.exports.authCaptain = async (req, res, next) => {  // Middleware function to authenticate captain
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];  // Get token from cookies or headers

    if(!token) {  // Check if token is provided
        return res.status(401).json({ message: 'Unauthorized' });  // Return unauthorized response
    }

    const isBlackListed = await blackListTokenModel.findOne({token : token});  // Check if token is blacklisted

    if(isBlackListed) {  // If token is blacklisted
        return res.status(401).json({ message: 'Unauthorized' });  // Return unauthorized response
    }
    // Check if token is blacklisted

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token using secret key
        const captain = await captainModel.findById(decoded._id);  // Find captain by ID from token

        req.captain = captain;  // Attach captain to request object
        return next();  // Proceed to next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });  // Return unauthorized response if token is invalid
    }


}