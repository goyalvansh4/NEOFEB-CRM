const express = require('express');
const { createInvoice, getAllInvoices, getInvoice,deleteinvoice } = require('../Controller/InvoiceController');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware')


router.post('/',authMiddleware, createInvoice);
router.get('/',authMiddleware, getAllInvoices);
router.get('/:id',authMiddleware, getInvoice);
router.delete('/:id',authMiddleware, deleteinvoice); 

module.exports = router;