const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const { getLeads, addLead, updateLead, deleteLead, getLead } = require('../Controller/LeadsController');
const router = express.Router();

// Lead Routes
router.get('/',authMiddleware, getLeads);              // Fetch all leads
router.get('/:id',authMiddleware, getLead);          // Fetch a single lead by ID
router.post('/',authMiddleware, addLead);               // Add a new lead
router.put('/:id',authMiddleware, updateLead);          // Update a lead by ID
router.delete('/:id',authMiddleware, deleteLead);       // Delete a lead by ID

module.exports = router;