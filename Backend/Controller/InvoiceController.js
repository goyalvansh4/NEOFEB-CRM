const Invoice = require('../Models/Invoice');

// Create a new invoice
const createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Get all invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).send(invoices);
  } catch (error) {
    res.status(500).send(error);
  }
}


// Get a single invoice
const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).send("Invoice not found");
    }
    res.status(200).send(invoice);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoice
}
