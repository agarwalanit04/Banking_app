const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/userpersonaldetails/:accountNumber', userController.getuserinfo)
router.get('/empdetails/:accounNumber', userController.getempdetails);
router.post('/login', userController.login);

module.exports = router;
