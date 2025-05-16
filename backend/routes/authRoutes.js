// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login , forgotPassword , resetPassword } = require('../controllers/authController');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');




router.post('/register', register);
router.post('/login', login);

// Password reset request
router.post('/forgot-password', forgotPassword); 

// Password reset confirmation
router.post('/reset-password', resetPassword);
module.exports = router;
