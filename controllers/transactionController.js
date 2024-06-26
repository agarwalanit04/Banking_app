const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const TransactionObj = require('../interfaces/transaction');
exports.gettransactionhistory = async (req, res) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);
        var account = await collection.findOne({ AccountNumber: accountNumber });

        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Account Not found' });
        }
    } catch(err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
  }};