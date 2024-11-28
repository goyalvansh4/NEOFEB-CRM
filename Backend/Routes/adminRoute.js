const express = require('express');
const { handleLogin, handleRegister, handleVerifyOTP } = require('../Controller/adminController');
const router = express.Router();


router.post(`/register`, handleRegister);
router.post(`/login`, handleLogin);
router.post('/verify-otp', handleVerifyOTP);


module.exports = router;
