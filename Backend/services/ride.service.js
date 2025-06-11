const rideModel = require('../models/ride.model');
const mapService = require('./map.service');
const crypto = require('crypto');

function getotp(num){
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

async function ridefare(pickup, dropoff) {
    if (!pickup || !dropoff) {
        throw new Error('Pickup and destination locations are required');
    }

    // Get distance between pickup and destination
    const distanceTime = await mapService.getDistanceAndTime(pickup, dropoff);

    // Validate distanceTime response
    if (!distanceTime?.distance?.value || !distanceTime?.duration?.value) {
        throw new Error('Invalid distance or duration values received');
    }

    const rideFare = {
        auto: { base: 30, perKm: 5 },
        car: { base: 50, perKm: 8 },
        bike: { base: 20, perKm: 3 }
    };

    const perMinuteRate = {
        auto: 1,
        car: 2,
        bike: 1
    };

    // Calculate fares for each vehicle type
    const fares = {
        auto: Math.round(rideFare.auto.base + ((distanceTime.distance.value / 1000) * rideFare.auto.perKm) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(rideFare.car.base + ((distanceTime.distance.value / 1000) * rideFare.car.perKm) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        bike: Math.round(rideFare.bike.base + ((distanceTime.distance.value / 1000) * rideFare.bike.perKm) + ((distanceTime.duration.value / 60) * perMinuteRate.bike))
    };

    return fares;
}

module.exports.ridefare = ridefare;

module.exports.createRide = async ({
    user, pickup, dropoff, vehicleType
}) => {
    try {
        // Validate input parameters
        if (!user || !pickup || !dropoff || !vehicleType) {
            throw new Error('User, pickup, dropoff, and vehicle type are required');
        }

        // Calculate fare
        const fares = await ridefare(pickup, dropoff);
        const calculatedFare = fares[vehicleType];

        // Create a new ride document
        const ride = await rideModel.create({
            user,
            pickup,
            dropoff,
            otp: getotp(6),
            fare: calculatedFare,
        });

        return ride;
    } catch (error) {
        throw new Error(`Failed to create ride: ${error.message}`);
    }
};

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}