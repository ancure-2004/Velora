const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, dropoff, vehicleType } = req.body;

        // Validate vehicleType
        if (!['car', 'bike', 'auto'].includes(vehicleType)) {
            return res.status(400).json({ 
                error: 'Invalid vehicle type. Must be car, bike, or auto' 
            });
        }

        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            dropoff,
            vehicleType
        });

        return res.status(201).json({ ride });
    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ 
            error: error.message || 'Internal server error'
        });
    }
}

module.exports.ridefare = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, dropoff } = req.query;  // Changed from req.body to req.query

        if (!pickup || !dropoff) {
            return res.status(400).json({
                error: 'Pickup and dropoff locations are required'
            });
        }

        const fares = await rideService.ridefare(pickup, dropoff);

        return res.status(200).json( fares );
    } catch (error) {
        console.error('Error calculating fare:', error);
        return res.status(500).json({ 
            error: error.message || 'Internal server error'
        });
    }
}