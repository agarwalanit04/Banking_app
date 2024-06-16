const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/balance/:accountNumber', accountController.getAccountBal);
router.post('/', accountController.createAccount);

module.exports = router;
