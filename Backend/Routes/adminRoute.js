const express = require('express');
const { handleLogin } = require('../Controller/adminController');
const router = express.Router();
// const adminController = require('../Controllers/adminController');


router.post('/login', handleLogin);


