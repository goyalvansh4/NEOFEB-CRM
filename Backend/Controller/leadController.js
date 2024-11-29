const Leads = require("../Models/Leads");


// Get all leads
const getLeads = async (req, res) => {
  try {
    const leads = await Leads.find().sort({ createdAt: -1 }); // Sorted by most recent
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving leads', error });
  }
};

// Add a new lead
const addLead = async (req, res) => {
  const { leadName, companyName, email, phone, source, sourceDetails, notes } = req.body;

  // Validation
  if (!leadName || !companyName || !email || !phone || !source) {
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
    });
    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', newLead });
  } catch (error) {
    res.status(500).json({ message: 'Error adding lead', error });
  }
};

// Update an existing lead
const updateLead = async (req, res) => {
  const { id } = req.params;
  const { leadName, companyName, email, phone, source, sourceDetails, notes } = req.body;

  try {
    const updatedLead = await Leads.findByIdAndUpdate(
      id,
      { leadName, companyName, email, phone, source, sourceDetails, notes },
      { new: true }
    );
    if (!updatedLead) return res.status(404).json({ message: 'Lead not found' });
    res.status(200).json({ message: 'Lead updated successfully', updatedLead });
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
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead', error });
  }
};

module.exports = { getLeads, addLead, updateLead, deleteLead };