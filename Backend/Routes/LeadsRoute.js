const express = require('express');
const { getLeads, addLead, updateLead, deleteLead, getLead } = require('../Controller/LeadsController');
const router = express.Router();

// Lead Routes
router.get('/', getLeads);              // Fetch all leads
router.get('/:id', getLead);             // Fetch a single lead by ID
router.post('/', addLead);               // Add a new lead
router.put('/:id', updateLead);          // Update a lead by ID
router.delete('/:id', deleteLead);       // Delete a lead by ID

module.exports = router;