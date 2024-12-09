const {Schema, model} = require('mongoose');

const companyBillSchema = new Schema({
     name: {
        type: String,
        required: true,
     },
     email: {
        type: String,
        required: true,
     },
      mobile: {
          type: String,
          required: true,
      },
      address: {
          type: String,
          required: true,
      },
      city: {
          type: String,
          required: true,
      },
      state: {
          type: String,
          required: true,
      },
      country: {
          type: String,
          required: true,
      }
},{timestamps:true});

const CompanyBill = model('CompanyBill', companyBillSchema);

module.exports = CompanyBill;