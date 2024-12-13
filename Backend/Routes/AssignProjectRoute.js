const express = require('express');
const router = express.Router();


const { assignProjectToEmployee } = require('../Controller/AssignProjectController');

router.post('/assignProject', assignProjectToEmployee);


module.exports = router;