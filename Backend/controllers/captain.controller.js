const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');  // Import blacklist token model

module.exports.registerCaptain = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      const { fullName, email, password, vehicle } = req.body;
  
      const isCaptainExists = await captainModel.findOne({ email });
  
      if (isCaptainExists) {
        return res.status(409).json({ message: 'Captain already exists' });
      }
  
      const hashedPassword = await captainModel.hashPassword(password);
  
      const captain = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      });
  
      const token = await captain.generateAuthToken();
  
      return res.status(201).json({ token, captain });
    } catch (err) {
      console.error('registerCaptain Error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      const captain = await captainModel.findOne({ email }).select('+password');
  
      if (!captain) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordMatch = await captain.comparePassword(password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = await captain.generateAuthToken();
  
      res.cookie('token', token);
      return res.status(200).json({ token, captain });

    } catch (err) {
      console.error('loginCaptain Error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token });  // Add the token to the blacklist

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}