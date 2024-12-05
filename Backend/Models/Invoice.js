const mongoose = require('mongoose');


const Schema = mongoose.Schema({
  "company_name": {type : String, required: true},
  "company_email": {type : String, required: true},
  "company_mobile_number": {type : String, required: true},
  "company_address": {type : String, required: true},
  "company_city": {type : String, required: true},
  "company_post_code": {type : String, required: true},
  "company_country": {type : String, required: true},
  "client_name": {type : String, required: true},
  "client_email": {type : String, required: true},
  "client_postcode": {type : String, required: true},
  "client_address": {type : String, required: true},
  "client_city": {type : String, required: true},
  "client_country": {type : String, required: true},
  "invoice_date": {type : String, required: true},
  "payment_terms": {type : String, required: true},
  "items": {type : Array, required: true},
  "total": {type : Number, required: true},
});

const Invoice = mongoose.model('Invoice', Schema);
module.exports = Invoice;
