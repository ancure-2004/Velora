const express = require('express');
const router = express.Router();
const { body } = require('express-validator');  // Import express-validator for validation
const userController = require('../controllers/user.controller');

router.post( '/register', [  // Define validation rules for user registration
    body('email').isEmail().withMessage('Invalid email format'),  // Validate email format

    body('fullName.firstName')
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),  // Validate first name length
  
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),  // Validate password length
]
, userController.registerUser);  // Register user route


module.exports = router; // Export the router for use in the main app