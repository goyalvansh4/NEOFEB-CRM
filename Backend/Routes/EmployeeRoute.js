const express = require('express');
const control = require('../Controller/EmployeeController')



const EmployeeRoute = express.Router();

EmployeeRoute.post("/",control.addEmployee)
EmployeeRoute.get("/",control.getEmployee)
EmployeeRoute.get("/:id",control.getEmployeebyid)
EmployeeRoute.delete("/:id",control.Employeedelete)
EmployeeRoute.put("/:id",control.Employeeupdate)


module.exports = EmployeeRoute;
