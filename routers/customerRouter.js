const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/customer', customerController.getlistofuseraccounts);

module.exports = router;