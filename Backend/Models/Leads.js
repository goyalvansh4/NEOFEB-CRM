const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },       
  companyName: { type: String, required: true },  
  email: { type: String, required: true, unique: true }, 
  phone: { type: String, required: true },         
  source: { type: String, required: true },       
  sourceDetails: { type: String },                 
  notes: { type: String },                         
  createdAt: { type: Date, default: Date.now }, 
  status:{type:mongoose.Schema.Types.ObjectId,ref:'Status', required : true},
});

const Leads = mongoose.model('Lead', leadSchema);
module.exports = Leads;