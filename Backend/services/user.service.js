const userModel = require('../models/user.model');

module.exports.createUser = async ({   // Function to create a new user
    firstName,
    lastName,
    email,
    password,
}) => {
    if (!firstName || !email || !password) {     // Check if all required fields are provided
        throw new Error('All fields are required');
    }

    const user = await userModel.create({   // Create a new user in the database
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
    });

    return user;  // Return the created user
}