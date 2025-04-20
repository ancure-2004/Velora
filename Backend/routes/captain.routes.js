const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');

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

module.exports = router;