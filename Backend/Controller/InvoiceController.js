const Invoice = require('../Models/Invoice');


// Create a new invoice
const createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    let response = { status: "success", msg: "Invoice created successfully",data:invoice };
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({error,msg: "Invoice not created successfully"});
  }
};


// Get all invoices
const getAllInvoices = async (req, res) => {
  console.log("Get all invoices");
  try {
    const invoices = await Invoice.find()
    .populate('invoiceStatus').populate('client_id').populate('companyBill_id')
    .then((invoices) => console.log(invoices))
    .catch((error) => console.error(error));
    res.status(200).json({
      data: invoices,
      status: "success",
      msg: "Get all invoices successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


// Get a single invoice
const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('invoiceStatus').populate('client_id').populate('companyBill_id');
    if (!invoice) {
      return res.status(404).json({ status: 'error', msg: 'Invoice not found' });
    }
    res.status(200).json({ status: 'success', msg: 'Invoice found', data: invoice });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


const deleteinvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id)  
    if (!invoice) {
      return res.status(404).json({ status: 'error', msg: 'Invoice not found' });
    }
    res.status(200).json({ status: 'success', msg: 'Invoice deleted' });
  }
  catch (error) {
    console.log(error);
    res.status(500
    ).send
    (error);
  }
}


module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoice,
  deleteinvoice
}
