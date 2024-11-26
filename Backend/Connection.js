const mongoose = require('mongoose');
const dotenv =require('dotenv');
dotenv.config();


const mongodbUrl = process.env.MONGODB_URL;

mongoose.connect(mongodbUrl,{ useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 40000 }).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

module.exports = mongoose;







