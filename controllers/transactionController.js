const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const Account = require('../models/account');
const TransactionObj = require('../interfaces/transaction');

exports.transactionhistory = async (req, res) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);
        const transaction = await Transaction.findOne({ AccountNumber: accountNumber });
        
        if (transaction) {
            res.status(200).json(transaction);
        } else {
            res.status(404).json({ message: 'Account Not found' });
        }
    } catch(err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
  }};

exports.postcreditmoney = async (req, res) => {
    try {
        const transactDetails = req.body;
        console.log("Request body:", JSON.stringify(req.body, null, 2));

        const receiver = await Account.findOne({ AccountNumber: transactDetails.PaidTo });
        if (!receiver) {
            console.log("Receiver account does not exist");
            return res.status(400).json({ error: "Receiver account doesn't exist" });
        }

        const sender = await Account.findOne({ AccountNumber: transactDetails.Receiver });
        if (!sender) {
            console.log("Sender account does not exist");
            return res.status(400).json({ error: "Sender account doesn't exist" });
        }

        // Ensure Amount is a number
        const amount = Number(transactDetails.Amount);
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const transactionType = transactDetails.TransactionType;
// -->  const transactionDate = new Date().toISOString();

        if (transactionType === 'Credit') {
            if (sender.Balance < amount) {
                return res.status(400).json({ message: 'Insufficient funds' });
            }

            // Upd sender balance
            await Account.updateOne(
                { AccountNumber: transactDetails.Receiver },
                { $inc: { Balance: -amount } }
            );

            // Upd receiver balance
            await Account.updateOne(
                { AccountNumber: transactDetails.PaidTo },
                { $inc: { Balance: amount } }
            );

        } else if (transactionType === 'Debit') {
            if (receiver.Balance < amount) {
                return res.status(400).json({ message: 'Insufficient funds' });
            }

            // Upd receiver's balance
            await Account.updateOne(
                { AccountNumber: transactDetails.Receiver },
                { $inc: { Balance: amount } }
            );

            // Upd sender's balance
            await Account.updateOne(
                { AccountNumber: transactDetails.PaidTo },
                { $inc: { Balance: -amount } }
            );

        } else {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        await Transaction.create({
            TransactionDate: transactionDate, 
            TransactionType: transactionType,
            PaidTo: transactDetails.PaidTo,
            ReceivedFrom: transactDetails.Receiver,
            Amount: amount
        
    });

        res.status(200).json({ message: 'Transaction successful' });
    
    } catch (err) {
        console.error("Error during transaction:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 

