const mongoose = require("../Connection")


const schema=new mongoose.Schema({

    "name":{type:String,require:true},
    "description":{type:String,require:true},
    
   
})



const Status =mongoose.model("Status",schema)

module.exports=Status;