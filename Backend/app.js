const dotenv = require('dotenv'); // Import dotenv to load environment variables from .env file
dotenv.config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests
const app = express();

app.use(cors()); // Use CORS middleware to allow cross-origin requests

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;