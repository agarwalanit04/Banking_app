const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

router.post('/:accountNumber', balanceController.getAccountNum);

module.exports = router;
