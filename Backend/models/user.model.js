const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation and verification

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minLength: [3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters long'],
        select: false, // Exclude password from query results by default
    },
    socketid: {
        type: String,   
    },
}); // Define a new Mongoose schema for the user model

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET); // Generate a JWT token using the user's ID and a secret key
    return token; // Return the generated token
}

userSchema.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password); // Compare the candidate password with the hashed password
    return isMatch; // Return true if the passwords match, false otherwise
}

userSchema.statics.hashPassword = async function (password) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using the generated salt
    return hashedPassword; // Return the hashed password
} // Define a static method to hash passwords

const userModel = mongoose.model('user', userSchema); // Create a Mongoose model for the user schema
module.exports = userModel; // Export the user model for use in other files
// This code defines a Mongoose schema for a user model, 
// including methods for generating authentication tokens, comparing passwords, and hashing passwords.
//  It also includes validation for the email format and password length.