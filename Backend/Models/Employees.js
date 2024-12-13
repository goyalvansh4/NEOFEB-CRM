const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const employeesSchema = new Schema({
  employee_id: {type: String,required: true},
  employee_name: {type: String,required: true},
  employee_email: {type: String,required: true},
  employee_mobile: {type: Number,required: true},
  employee_address: {type: String,required: true},
  designation: {type: String,required: true},
  department: {type: String,required: true},
  employee_status: {type: String,required: true},
  employee_salary: {type: Number,required: true},
  projects: {type: Array},
  leaves: {type: Array},
  incentives: {type: Array},
  working_days: {type: Number},
  experience: {type: String,required: true},
  feedback: {type: String},
  skills: {type: Array},


  
},{timestamps:true});

module.exports = mongoose.model('Employees',employeesSchema  );

