const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const { createCompanyBill, getCompanyBill, updateCompanyBill, deleteCompanyBill, getCompanyBills } = require('../Controller/CompanyBillController');

router.post('/',authMiddleware, createCompanyBill);
router.get('/',authMiddleware, getCompanyBills);
router.get('/:id',authMiddleware, getCompanyBill);
router.put('/:id',authMiddleware, updateCompanyBill);
router.delete('/:id',authMiddleware, deleteCompanyBill);


module.exports = router;
