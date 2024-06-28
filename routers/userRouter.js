const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user/:accountNumber', userController.getuserpersonaldetails);
router.get('/empdetails/:accountNumber', userController.getempdetails);
// router.post('/', userController.createAccount);\

module.exports = router;
