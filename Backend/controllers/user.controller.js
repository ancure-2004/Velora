const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');  // Import express-validator for validation
const blackListTokeModel = require('../models/blackListToken.model');  // Import blacklist token model

module.exports.registerUser = async (req, res, next) => {


    const errors = validationResult(req);  // Validate request data using express-validator
    if (!errors.isEmpty()) {  // Check if there are validation errors
        return res.status(422).json({ errors: errors.array() });  // Return validation errors
    }

    const { fullName, email, password } = req.body;  // Destructure request body

    const isUserExists = await userModel.findOne({ email });  // Check if a user with the same email already exists

    if (isUserExists) {  // If a user with the same email exists
        return res.status(400).json({ message: 'User already exists' });  // Return conflict response
    }

    const hashedPassword = await userModel.hashPassword(password);  // Hash the password using userModel

    const user = await userService.createUser({  // Create a new user using userService
        firstName : fullName.firstName,  // Use the first name from the request body
        lastName : fullName.lastName,  // Use the last name from the request body 
        email,
        password: hashedPassword,  // Use the hashed password
    });

    const token = await user.generateAuthToken();  // Generate a token for the user

    res.status(201).json({ token, user});// Return success response

}

module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);  // Validate request data using express-validator
    if (!errors.isEmpty()) {  // Check if there are validation errors
        return res.status(422).json({ errors: errors.array() });  // Return validation errors
    }

    const { email, password } = req.body;  // Destructure request body

    const user = await userModel.findOne({ email }).select('+password');  // Find user by email

    if(!user) {  // Check if user exists
        return res.status(401).json({ message: 'Invalid email or password' });  // Return error response
    }

    const isMatch = await user.comparePassword(password);  // Compare passwords

    if(!isMatch) {  // Check if passwords match
        return res.status(401).json({ message: 'Invalid email or password' });  // Return error response
    }

    const token = await user.generateAuthToken();  // Generate a token for the user
    res.cookie('token', token);
    res.status(200).json({ token, user });  // Return success response
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json( req.user );  // Return user profile
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');  // Clear the token cookie

    const token = req.cookies.token || req.headers.authorization.split(' ') [ 1 ];  // Get the token from cookies

    await blackListTokeModel.create({  // Add the token to the blacklist
        token,
    });

    res.status(200).json({ message: 'Logged out successfully' });  // Return success response
}