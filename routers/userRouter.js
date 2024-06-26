const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user/:accountNumber', userController.getAccountBal);
router.post('/', userController.createAccount);

module.exports = router;
