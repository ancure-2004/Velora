const dotenv = require('dotenv'); // Import dotenv to load environment variables from .env file
dotenv.config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests
const cookieParser = require('cookie-parser'); // Import cookie-parser middleware
const app = express();
const connectDB = require('./db/db'); // Import the connectDB function from db.js
const userRoutes = require('./routes/user.routes'); // Import user routes
const captainRoutes = require('./routes/captain.routes'); // Import captain routes
const mapsRoutes = require('./routes/map.routes'); // Import map routes
const rideRoutes = require('./routes/ride.routes'); // Import ride routes

connectDB(); // Call the connectDB function to establish a connection to the database

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(cookieParser()); // Middleware to parse cookies from request headers

app.use(cors({
  origin: process.env.SOCKET_ORIGIN,   // will read from .env or Render
  credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes); // Use user routes for handling user-related requests
app.use('/captains', captainRoutes); // Use captain routes for handling captain-related requests

app.use('/maps', mapsRoutes); // Use map routes for handling map-related requests
app.use('/rides', rideRoutes); // Use ride routes for handling ride-related requests

module.exports = app;