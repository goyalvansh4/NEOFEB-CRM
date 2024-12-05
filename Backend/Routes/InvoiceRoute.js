const express = require('express');
const router = express.Router();


router.post('/invoice', createInvoice);
router.get('/invoice', getAllInvoices);
router.get('/invoice/:id', getInvoice);

module.exports = router;