const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const Account = require('../models/account');
const TransactionObj = require('../interfaces/transaction');

exports.transactionhistory = async (req, res) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);
        const transaction = await Account.findOne({ AccountNumber: accountNumber });
        
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

        if (transactionType === 'Credit') {
            if (sender.Balance < amount) {
                return res.status(400).json({ message: 'Insufficient funds' });
            }

            // Update sender's balance
            await Account.updateOne(
                { AccountNumber: transactDetails.Receiver },
                { $inc: { Balance: -amount } }
            );

            // Update receiver's balance
            await Account.updateOne(
                { AccountNumber: transactDetails.PaidTo },
                { $inc: { Balance: amount } }
            );

        } else if (transactionType === 'Debit') {
            if (receiver.Balance < amount) {
                return res.status(400).json({ message: 'Insufficient funds' });
            }

            // Update receiver's balance
            await Account.updateOne(
                { AccountNumber: transactDetails.Receiver },
                { $inc: { Balance: amount } }
            );

            // Update sender's balance
            await Account.updateOne(
                { AccountNumber: transactDetails.PaidTo },
                { $inc: { Balance: -amount } }
            );

        } else {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        res.status(200).json({ message: 'Transaction successful' });

    } catch (err) {
        console.error("Error during transaction:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// exports.postcreditmoney = async(req, res) =>{                 
//         // const session = client.startSession(); // Start a session for transaction management.
//             try {
//               const transactDetails = req.body;
      
//               console.log("Request body is: " + JSON.stringify(req.body, null, 2));
//               console.log("userDetails is: " + JSON.stringify(transactDetails, null, 2));
      
              
//               // const db = client.db(dbName);
//               // const accountCollection = db.collection('Account');
      
//               console.log("Paid To: " + transactDetails.PaidTo + " Recieved: " + transactDetails.Receiver + 
//                           " Transaction Type: " + transactDetails.TransactionType + " Amount: " + transactDetails.Amount);
      
//               const receiver = await Account.findOne({ AccountNumber: req.body.PaidTo });
//               // console.log("receiver: " + JSON.stringify(receiver, null, 2));
//               if (!receiver) {
//                   console.log("Returning 400: Receiver account does not exist");
//                   return res.status(400).json({ error: "Receiver account doesn't exist" });
//               }
      
//               const sender = await Account.findOne({ AccountNumber: req.body.Receiver });
//               console.log("sender: " + JSON.stringify(sender, null, 2));
//               if (!sender) {
//                   console.log("Returning 400: Sender account does not exist");
//                   return res.status(400).json({ error: "Sender account doesn't exist" });
//               }
      
//               const Amount = parseInt(req.body.Amount);
//               const transactionType = req.body.TransactionType;
      
//               if (transactionType === 'Credit') {
//                   if (sender.Balance < Amount) {
//                       return res.status(400).json({ message: 'Insufficient funds' });
//                   }
      
//                   const updateSender = await Account.updateOne(
//                       { AccountNumber: req.body.Receiver },
//                       { $inc: { Balance: -Amount } }
//                   );
      
//                   const updateReceiver = await Account.updateOne(
//                       { AccountNumber: req.body.PaidTo },
//                       { $inc: { Balance: Amount } }
//                   );
      
//               } else if (transactionType === 'Debit') {
//                   if (sender.Balance >= Amount) {
//                       const updateSender = await Account.updateOne(
//                           { AccountNumber: req.body.Receiver },
//                           { $inc: { Balance: -Amount } }
//                       );
//                   } else {
//                       return res.status(400).json({ message: 'Insufficient funds' });
//                   }
//               } else {
//                   return res.status(400).json({ message: 'Invalid transaction type' });
//               }
      
//               res.status(200).json({ message: 'Transaction successful' });
      
//           } catch (err) {
//               console.error("Error during transaction:", err);
//               res.status(500).json({ message: 'Internal server error' });
//           }
// };