const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/map.service'); // Assuming you have a map service for distance and fare calculations
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model')

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

        res.status(201).json({ ride });

        const pickupCoordinates = await mapService.getAddress(pickup);
        // console.log(pickupCoordinates);
        const captainInRadius = await mapService.getCaptainsInRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

        ride.otp = "";

        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');

        captainInRadius.map(async captain => {
            sendMessageToSocketId(captain.socketid, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

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

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketid, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketid, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketid, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}