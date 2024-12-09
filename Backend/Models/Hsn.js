const mongoose = require('mongoose')


const schema=new mongoose.Schema({

    "hsn":{type:String,require:true},
    "percent" : {type:String, require:true},
    
})



const Hsn =mongoose.model("Hsn",schema)

module.exports=Hsn;
