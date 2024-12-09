const mongoose = require("../Connection")

const leadStatusSchema=new mongoose.Schema({
    "leadStatus":{type:String,require:true,unique:true},
    "description":{type:String},
},{timestamps:true})

const leadStatusModel =mongoose.model("LeadStatus",leadStatusSchema)
module.exports=leadStatusModel;