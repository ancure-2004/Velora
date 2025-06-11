const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the user who created the ride
        ref: 'user',  // Reference to the user model
        required: true,  // User is required for a ride
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the captain assigned to the ride
        ref: 'captain',  // Reference to the user model
        default: null,  // Captain can be null if not assigned yet
    },
    pickup: {
        type: String,
        required: true,
        minlength: 3,  // Minimum length for pickup location
    },
    dropoff: {
        type: String,
        required: true,
        minlength: 3,  // Minimum length for dropoff location
    },
    fare: {
        type: Number,
        required: true,  // Fare is required for a ride
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],  // Possible statuses for a ride
        default: 'pending',  // Default status is pending
    },
    distance: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    orderId: {
        type: String,
    },
    paymentId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,  // OTP for ride verification
        selected: false,  // OTP is not selected by default
        required: true,  // OTP is required for a ride
    },

});  // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model('ride', rideSchema);  // Create and export the ride model using the defined schema