const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  project_name: {type: String,required: true},
  project_status: {type: String,required: true},
  client_id: {type:mongoose.Schema.Types.ObjectId, ref: 'Client'},
  assigned_to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employees' }],
  price: {type:Number,required: true},
  start_date: {type:String},
  deadline: {type:String},
  duration: {type:String},

},{timestamps:true});

const Project=mongoose.model("Project",projectSchema)

module.exports=Project;
  





