const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const { getHsn, addHsn, Hsndelete } = require('../Controller/HsnController');



const router = express.Router();

// Hsn Routes
router.get('/',authMiddleware,getHsn );              // Fetch all hsns
router.post('/',authMiddleware,addHsn );               // Add a new hsn
router.delete('/:id',authMiddleware,Hsndelete );       // Delete a hsn by ID

module.exports = router;