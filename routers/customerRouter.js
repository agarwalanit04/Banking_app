const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/listofuseraccounts', customerController.getlistofuseraccounts)
// console.log("hi start")
module.exports = router;
