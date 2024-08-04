const express = require('express');
const router = express.Router();
const { updatePaymentKey } = require('../controllers/paymentsController');

router.post('/key', updatePaymentKey);

module.exports = router;
