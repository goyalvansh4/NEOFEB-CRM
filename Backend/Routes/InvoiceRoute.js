const express = require('express');
const router = express.Router();


router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/:id', getInvoice);

module.exports = router;