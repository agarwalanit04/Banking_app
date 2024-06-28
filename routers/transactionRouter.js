const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/transaction/:accountNumber', transactionController.transactionhistory);
router.post('/credit',transactionController.postcreditmoney);
module.exports = router;
