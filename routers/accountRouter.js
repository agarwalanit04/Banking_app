const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/balance/:accountNumber', accountController.getAccountBal);
router.get('/userdetails/:accountNumber', accountController.findaccount);
router.post('/addaccount', accountController.createAccount);

module.exports = router;
