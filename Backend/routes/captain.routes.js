const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('fullName.firstName').notEmpty().withMessage('First name is required.'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long.'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required.'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required.'),
    body('vehicle.vehicleType').notEmpty().withMessage('Vehicle type is required.'),
    body('vehicle.capacity').notEmpty().withMessage('Vehicle capacity is required.'),
], 
    captainController.registerCaptain
);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').notEmpty().withMessage('Password is required.'),
], 
    captainController.loginCaptain
);

router.get('/profile', 
    authMiddleware.authCaptain, 
    captainController.getCaptainProfile
);

router.get('/logout', 
    authMiddleware.authCaptain, 
    captainController.logoutCaptain
);

module.exports = router;