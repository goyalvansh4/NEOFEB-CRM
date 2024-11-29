const {Schema, model} = require('mongoose');

const adminSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});


const adminModel = model('Admin', adminSchema);
module.exports = adminModel;