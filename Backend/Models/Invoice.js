const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoice_number: { type: String, required: true },
  companyBill_id: { type: mongoose.Types.ObjectId, ref: 'CompanyBill', required: true },
  client_id: { type: mongoose.Types.ObjectId, ref: 'Client', required: true },
  items: { type: Array, required: true },
  invoiceStatus: { type: mongoose.Types.ObjectId, ref: 'invoiceStatus', required: true },
  invoice_date: { type: String, required: true },
  payment_terms: { type: String, required: true },
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model('Invoice', invoiceSchema);