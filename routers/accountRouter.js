const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/balance/:accountNumber', accountController.getAccountBal);
router.get('/userdetails/:accountNumber', accountController.findaccount);
router.get('/userpersonaldetails/:accountNumber', accountController.getuserinfo);
router.post('/addaccount', accountController.createAccount);

module.exports = router;
