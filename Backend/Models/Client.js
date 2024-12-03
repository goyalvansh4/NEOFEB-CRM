const mongoose = require("../Connection")


const schema=new mongoose.Schema({

    "name":{type:String,require:true},
    "email" : {type:String, require:true,unique:true},
    "phone_number" : {type:String,require:true},
    "company_name" : {type:String,require:true},
    "pan" : {type:String,require:true},
    "cin" : {type:String,require:true},
    "gst_number" : {type:String,require:true},
    "tan" : {type:String,require:true},
    "country" : {type:String,require:true},
    "state" : {type:String,require:true},
    "city" : {type:String,require:true},
    "pincode" : {type:String,require:true},
    "address" : {type:String,require:true},
    "bank_name" : {type:String,require:true},
    "bank_account" : {type:String,require:true},
    "ifsc_code" : {type:String,require:true},
    "upi_id" : {type:String,require:true},
    "status" : {type:String,require:true},
})



const Client =mongoose.model("Client",schema)

module.exports=Client;