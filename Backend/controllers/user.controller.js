const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');  // Import express-validator for validation

module.exports.registerUser = async (req, res, next) => {


    const errors = validationResult(req);  // Validate request data using express-validator
    if (!errors.isEmpty()) {  // Check if there are validation errors
        return res.status(422).json({ errors: errors.array() });  // Return validation errors
    }

    const { fullName, email, password } = req.body;  // Destructure request body

    const hashedPassword = await userModel.hashPassword(password);  // Hash the password using userService

    const user = await userService.createUser({  // Create a new user using userService
        firstName : fullName.firstName,  // Use the first name from the request body
        lastName : fullName.lastName,  // Use the last name from the request body
        email,
        password: hashedPassword,  // Use the hashed password
    });

    const token = await user.generateAuthToken(user);  // Generate a token for the user

    res.status(201).json({ token, user});// Return success response

}