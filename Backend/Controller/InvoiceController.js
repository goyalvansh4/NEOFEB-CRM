const Invoice = require('../Models/Invoice');

// Create a new invoice
const createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    let response = { status: "success", msg: "Invoice created successfully",data:invoice };
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({error,msg: "Invoice not created successfully"});
  }
};


// Get all invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json({
      data: invoices,
      status: "success",
      msg: "Get all invoices successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
}


// Get a single invoice
const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ status: 'error', msg: 'Invoice not found' });
    }
    res.status(200).json({ status: 'success', msg: 'Invoice found', data: invoice });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoice
}
