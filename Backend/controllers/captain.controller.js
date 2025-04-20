const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

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
  