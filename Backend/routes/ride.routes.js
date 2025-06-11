const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');  // Import express-validator for validation
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');  // Import authentication middleware

router.post('/create', [
    authMiddleware.authUser,  // Apply authentication middleware to protect the route
    body('pickup')
      .isLength({ min: 3 })
      .withMessage('Pickup location must be at least 3 characters long'),  // Validate pickup location length

    body('dropoff')
      .isLength({ min: 3 })
      .withMessage('Dropoff location must be at least 3 characters long'),  // Validate dropoff location length

    body('vehicleType')
      .isIn(['car', 'bike', 'auto'])
      .withMessage('Invalid ride type'),  // Validate ride type

  ], rideController.createRide
);  // Create ride route

router.get('/fare', [
    authMiddleware.authUser,  // Apply authentication middleware to protect the route
    query('pickup')
      .isLength({ min: 3 })
      .withMessage('Pickup location must be at least 3 characters long'),  // Validate pickup location length

    query('dropoff')
      .isLength({ min: 3 })
      .withMessage('Dropoff location must be at least 3 characters long'),  // Validate dropoff location length

  ], rideController.ridefare
);  // Get ride fare route

router.post('/confirm', [
    authMiddleware.authCaptain,  // Apply authentication middleware to protect the route
    body('rideId')
      .isMongoId()
      .withMessage('Invalid ride ID'),  // Validate ride ID format
  ], rideController.confirmRide
);  // Confirm ride route

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router; // Export the router for use in the main app