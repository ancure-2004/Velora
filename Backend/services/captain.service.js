const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({   // Function to create a new captain
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) => {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {     // Check if all required fields are provided
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({   // Create a new captain in the database
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
        vehicle: {  // Nest the vehicle properties here
            color,
            plate,
            capacity,
            vehicleType,
        },
    });

    return captain;  // Return the created captain
}