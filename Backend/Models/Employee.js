const mongoose = require("../Connection")


const schema=new mongoose.Schema({

    "name":{type:String,require:true},
    "position":{type:String,require:true},
    "email" : {type:String, require:true,unique:true},
    "status" : {type:String,require:true},
})



const Employee =mongoose.model("Employee",schema)

module.exports=Employee;