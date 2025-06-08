const mapService = require('../services/map.service');
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async (req, res, next) => {  // Controller function to get coordinates
    const errors = validationResult(req);  // Validate request parameters
        if (!errors.isEmpty()) {  // Check if address is provided
            return res.status(400).json({ message: 'Address is required' });  // Return bad request response
        }
    const { address } = req.query;  // Get address from query parameters

    try {
        const coordinates = await mapService.getAddress(address);  // Call service to get coordinates
        return res.status(200).json( coordinates );  // Return coordinates in response
    } catch (error) {
        return res.status(404).json({ message: 'Error fetching coordinates', error: error.message });  // Return error response
    }
}  

module.exports.getDistanceAndTime = async (req, res, next) => {  // Controller function to get distance and time
    const errors = validationResult(req);  // Validate request parameters
        if (!errors.isEmpty()) {  // Check if origin and destination are provided
            return res.status(400).json({ message: 'Origin and destination are required' });  // Return bad request response
        }
    const { origin, destination } = req.query;  // Get origin and destination from query parameters

    try {
        const distanceAndTime = await mapService.getDistanceAndTime(origin, destination);  // Call service to get distance and time
        return res.status(200).json( distanceAndTime );  // Return distance and time in response
    } catch (error) {
        return res.status(404).json({ message: 'Error fetching distance and time', error: error.message });  // Return error response
    }
}

module.exports.getSuggestions = async (req, res, next) => {  // Controller function to get suggestions
    const errors = validationResult(req);  // Validate request parameters
        if (!errors.isEmpty()) {  // Check if input is provided
            return res.status(400).json({ message: 'Input is required' });  // Return bad request response
        }
    const { input } = req.query;  // Get input from query parameters

    try {
        const suggestions = await mapService.getSuggestions(input);  // Call service to get suggestions
        return res.status(200).json( suggestions );  // Return suggestions in response
    } catch (error) {
        return res.status(404).json({ message: 'Error fetching suggestions', error: error.message });  // Return error response
    }
}