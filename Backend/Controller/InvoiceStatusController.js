const  invoiceStatusModel =  require('../Models/InvoiceStatus');

const createInvoiceStatus = async (req, res) => {
    try {
        const invoice = new invoiceStatusModel(req.body);
        await invoice.save();
        res.status(201).json({status:"success",msg:"Invoice Status Created Successfully",data:invoice});
    } catch (error) {
        res.status(400).json({status:"error",msg: error.message });
    }
}

const getInvoiceStatus = async (req, res) => {
    try {
      const invoices = await invoiceStatusModel.find();
        res.status(200).json({status:"success",msg:"Fetch Invoice Successfully",data:invoices});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getInvoiceStatusById = async (req, res) => {
    try {
        const invoice = await invoiceStatusModel.findById(req.params.id);
        res.status(200).json({status:"success",data:invoice});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateInvoiceStatus = async (req, res) => {
    try {
        const invoice = await invoiceStatusModel.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        res.status(200).json({status:"success",data:invoice});
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteInvoiceStatus = async (req, res) => {
    try {
        await invoiceStatusModel.findByIdAndDelete(req.params.id);
        res.status(200).json({status:"success",msg:'Invoice deleted successfully'});
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { createInvoiceStatus, getInvoiceStatus, getInvoiceStatusById, updateInvoiceStatus, deleteInvoiceStatus };