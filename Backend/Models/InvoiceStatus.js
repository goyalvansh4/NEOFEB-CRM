const {Schema, model} = require('mongoose');

const invoiceStatusSchema = new Schema({
    status: {
        type: String,
        required: true,
        unique: true,
    },
},{timestamps: true});

module.exports = model('InvoiceStatus', invoiceStatusSchema);
