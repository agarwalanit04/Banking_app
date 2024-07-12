const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/userpersonaldetails/:accountNumber', userController.getuserinfo)
router.get('/empdetails/:accounNumber', userController.getempdetails);

module.exports = router;
