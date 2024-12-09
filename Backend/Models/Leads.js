const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },       
  companyName: { type: String, required: true },  
  email: { type: String, required: true, unique: true }, 
  phone: { type: String, required: true },         
  source: { type: String, required: true },       
  sourceDetails: { type: String },                 
  notes: { type: String },
  follow_up_date: { type: String, required: true },
  remarks: { type: String },
  leadStatus:{type:mongoose.Schema.Types.ObjectId,ref:'LeadStatus', required : true},
}, { timestamps: true });

const Leads = mongoose.model('Lead', leadSchema);
module.exports = Leads;