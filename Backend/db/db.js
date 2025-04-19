const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import dotenv to load environment variables from .env file
dotenv.config(); // Load environment variables from .env file

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });
}

module.exports = connectDB; // Export the connectDB function for use in other files