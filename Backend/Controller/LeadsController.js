const Leads = require("../Models/Leads");
const mongoose = require("mongoose");


// Get all leads
const getLeads = async (req, res) => {
  try {
    const leads = await Leads.find().sort({ createdAt: -1 }).populate('leadStatus'); // Sorted by most recent
    res.status(200).json({status:"success",data:leads});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving leads', error });
  }
};

// Get a single lead

const getLead = async (req, res) => {
  const { id } = req.params;
  // console.log("id",id);
  try {
    const lead = await Leads.findById(id).populate('leadStatus');
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.status(200).json({ status:"success",message: 'Lead retrieved successfully', data:lead });

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ status:"error",message: 'Error retrieving lead', error });
  }
}

// Add a new lead
const addLead = async (req, res) => {
  const { leadName, companyName, email, phone, source, sourceDetails, notes,follow_up_date,leadStatus,remarks } = req.body;

  // Validation
  if (!leadName || !companyName || !email || !phone || !source || !follow_up_date || !leadStatus) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const newLead = new Leads({
      leadName,
      companyName,
      email,
      phone,
      source,
      sourceDetails,
      notes,
      follow_up_date,
      leadStatus,
      remarks
    });
    await newLead.save();
    res.status(201).json({ status:"success",message: 'Lead created successfully', data:newLead });
  } catch (error) {
    res.status(500).json({ message: 'Error adding lead', error });
  }
};

// Update an existing lead
const updateLead = async (req, res) => {
  const { id } = req.params;
  const leadData = req.body;
  try {
    const updatedLead = await Leads.findByIdAndUpdate(
      id,
      { ...leadData },
      { new: true }
    );
    if (!updatedLead) return res.status(404).json({ message: 'Lead not found' });
    res.status(200).json({ status:"success",message: 'Lead updated successfully', data:updatedLead });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lead', error });
  }
};

// Delete a lead
const deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLead = await Leads.findByIdAndDelete(id);
    if (!deletedLead) return res.status(404).json({ message: 'Lead not found' });
    res.status(200).json({ status:"success",message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead', error });
  }
};


module.exports = { getLeads,getLead, addLead, updateLead, deleteLead };