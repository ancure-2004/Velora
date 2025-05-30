const express = require('express');
const router = express.Router();
const { body } = require('express-validator');  // Import express-validator for validation
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');  // Import authentication middleware

router.post( '/register', [  // Define validation rules for user registration
    body('email').isEmail().withMessage('Invalid email format'),  // Validate email format

    body('fullName.firstName')
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),  // Validate first name length
  
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),  // Validate password length
  ] , userController.registerUser
);  // Register user route


router.post('/login', [  // Define validation rules for user login
    body('email').isEmail().withMessage('Invalid email format'),  // Validate email format

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),  // Validate password length
  ], userController.loginUser
);  // Login user route

router.get('/profile', authMiddleware.authUser ,userController.getUserProfile);  // Get user profile route

router.get('/logout', authMiddleware.authUser ,userController.logoutUser);  // Logout user route

module.exports = router; // Export the router for use in the main app