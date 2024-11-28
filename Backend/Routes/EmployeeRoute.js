const express = require('express');
const control = require('../Controller/EmployeeController')
const authMiddleWare = require('../Middleware/authMiddleware')



const EmployeeRoute = express.Router();

EmployeeRoute.post("/",authMiddleWare,control.addEmployee)
EmployeeRoute.get("/",authMiddleWare,control.getEmployee)
EmployeeRoute.get("/:id",authMiddleWare,control.getEmployeebyid)
EmployeeRoute.delete("/:id",authMiddleWare,control.Employeedelete)
EmployeeRoute.put("/:id",authMiddleWare,control.Employeeupdate)


module.exports = EmployeeRoute;
