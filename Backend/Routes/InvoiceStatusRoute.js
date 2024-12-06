const express = require('express');
const router = express.Router();

const { createInvoiceStatus, getInvoiceStatus, getInvoiceStatusById, updateInvoiceStatus, deleteInvoiceStatus } = require('../Controller/InvoiceStatusController');

router.post('/', createInvoiceStatus);
router.get('/', getInvoiceStatus);
router.get('/:id', getInvoiceStatusById);
router.put('/:id', updateInvoiceStatus);
router.delete('/:id', deleteInvoiceStatus);

module.exports = router;