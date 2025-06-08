const axios = require('axios');
const dotenv = require('dotenv'); // Import dotenv to load environment variables from .env file

module.exports.getAddress = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            return {
                success: true,
                coordinates: { latitude: lat, longitude: lng }
            };
        } else {
            return {
                success: false,
                message: 'Unable to find coordinates for the address'
            };
        }
    } catch (error) {
        return{
            success: false,
            message: 'Error processing geocoding request',
            error: error.message
        };
    }
}

module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        return {
            success: false,
            message: 'Origin and destination are required'
        };
    } 
    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows.length === 0 || response.data.rows[0].elements.length === 0) {
                return {
                    success: false,
                    message: 'No distance and time data found'
                };
            }

            return response.data.rows[0].elements[0];
            
        } else {
            return {
                success: false,
                message: 'Unable to find distance and time'
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: 'Error processing distance and time request', 
            error: error.message
        };
    }
}

module.exports.getSuggestions = async (input) => {
    if (!input) {
        return {
            success: false,
            message: 'Query is required'
        };
    }
    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            return {
                success: true,
                suggestions: response.data.predictions
            };
        } else {
            return {
                success: false,
                message: 'Unable to find suggestions'
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error processing suggestions request',
            error: error.message
        };
    }
}