const CompanyBill = require('../Model/CompanyBill');


const createCompanyBill = async (req, res) => {
    try {
        const companyBill = new CompanyBill(req.body);
        await companyBill.save();
        res.status(201).json({ status:"success",msg:"Company Bill Created SuccessFully",data: companyBill });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};






const getCompanyBills = async (req, res) => {
    try {
        const companyBill = await CompanyBill.find();
        res.status(200).json({ status:"success",msg:"Company Bill Fetched SuccessFully",data: companyBill });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getCompanyBill = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const companyBill = await CompanyBill.findById(_id);
        res.status(200).json({ status:"success",msg:"Company Bill Fetched SuccessFully",data: companyBill });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateCompanyBill = async (req, res) => {
    const { id: _id } = req.params;
    const companyBill = req.body;
    try {
        const updatedCompanyBill = await CompanyBill.findByIdAndUpdate(_id, companyBill, { new: true });
        res.status(200).json({ status:"success",msg:"Company Bill Updated SuccessFully",data: updatedCompanyBill });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const deleteCompanyBill = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const deletedCompanyBill = await CompanyBill.findByIdAndDelete(_id);
        res.status(200).json({ status:"success",msg:"Company Bill Deleted SuccessFully",data: deletedCompanyBill });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { createCompanyBill, getCompanyBills,getCompanyBill, updateCompanyBill, deleteCompanyBill };