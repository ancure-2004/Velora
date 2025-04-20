const dotenv = require('dotenv'); // Import dotenv to load environment variables from .env file
dotenv.config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests
const app = express();
const connectDB = require('./db/db'); // Import the connectDB function from db.js
const userRoutes = require('./routes/user.routes'); // Import user routes
const cookieParser = require('cookie-parser'); // Import cookie-parser middleware

connectDB(); // Call the connectDB function to establish a connection to the database

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(cookieParser()); // Middleware to parse cookies from request headers

app.use(cors()); // Use CORS middleware to allow cross-origin requests

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes); // Use user routes for handling user-related requests

module.exports = app;