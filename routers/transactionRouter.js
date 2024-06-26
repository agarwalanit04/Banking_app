const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/transaction/:accountNumber', transactionController.gettransactionhistory);

module.exports = router;
