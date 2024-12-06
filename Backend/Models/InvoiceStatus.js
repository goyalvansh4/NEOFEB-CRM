const { Schema, model } = require('mongoose');

const invoiceStatusSchema = new Schema(
  {
    invoiceStatus: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate status entries
    },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

module.exports = model('InvoiceStatus', invoiceStatusSchema);