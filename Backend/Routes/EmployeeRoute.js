const express = require('express');
const control = require('../Controller/EmployeeController')
const authmiddleware =require("../Middleware/authMiddleware")



const EmployeeRoute = express.Router();

EmployeeRoute.post("/",authmiddleware,control.addEmployee)
EmployeeRoute.get("/",authmiddleware,control.getEmployee)
EmployeeRoute.get("/:id",authmiddleware,control.getEmployeebyid)
EmployeeRoute.delete("/:id",authmiddleware,control.Employeedelete)
EmployeeRoute.put("/:id",authmiddleware,control.Employeeupdate)


module.exports = EmployeeRoute;
