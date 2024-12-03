const mongoose = require("../Connection")


const schema=new mongoose.Schema({

    "name":{type:String,require:true},
   
})



const Source =mongoose.model("Source",schema)

module.exports=Source;