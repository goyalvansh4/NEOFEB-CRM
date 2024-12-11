const { Schema, model } = require('mongoose');

const invoiceStatusSchema = new Schema(
  {
    invoiceStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = model('InvoiceStatus', invoiceStatusSchema);