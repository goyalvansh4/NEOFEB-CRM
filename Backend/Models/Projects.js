const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  project_name: {type: String,required: true},
  project_status: {type: String,required: true},
  client_id: {type: String,required: true},
  assigned_to: {type: Array,required: true},
  price: {type:Number },
  start_date: {type:String},
  deadline: {type:String,required: true},
  duration: {type:String},

},{timestamps:true});

const Project=mongoose.model("Project",projectSchema)

module.exports=Project;
  





