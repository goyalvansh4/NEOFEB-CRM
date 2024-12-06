const express = require('express');
const { createInvoice, getAllInvoices, getInvoice } = require('../Controller/InvoiceController');
const router = express.Router();


router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/:id', getInvoice);

module.exports = router;