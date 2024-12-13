const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const {createEmployees,getEmployees,getEmployeebyid,updateEmployees,deleteEmployees} = require('../Controller/EmployeesController');

router.post('/create',authMiddleware,createEmployees);
router.get('/',authMiddleware,getEmployees);
router.get('/:id',authMiddleware,getEmployeebyid);
router.put('/:id',authMiddleware,updateEmployees);
router.delete('/:id',authMiddleware,deleteEmployees);




module.exports = router;

