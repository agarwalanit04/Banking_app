const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
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

exports.postcreditmoney = async(req, res) =>{                 
        // const session = client.startSession(); // Start a session for transaction management.
            try {
            session.startTransaction(); // Start a transaction.
            
            const sender = await userCollection.findOne({ AccountNumber: senderAccount }, { session }); // Find the sender account in the collection.
            console.log("Sender account query:", { AccountNumber: senderAccount });
            console.log("Sender found:", sender);
            const receiver = await userCollection.findOne({ AccountNumber: receiverAccount }, { session }); // Find the receiver account in the collection.
        
            if (!sender) {
                await session.abortTransaction(); // Abort transaction if sender account is not found.
                return res.status(404).json({ message: 'Sender account not found' }); // Return error response.
            }
        
            if (!receiver) {
                await session.abortTransaction(); // Abort transaction if receiver account is not found.
                return res.status(404).json({ message: 'Receiver account not found' }); // Return error response.
            }
        
            if (sender.balance < amount) {
                await session.abortTransaction(); // Abort transaction if sender has insufficient funds.
                return res.status(400).json({ message: 'Insufficient funds' }); // Return error response.
            }
        
            const updateSender = await userCollection.updateOne(
                { AccountNumber: senderAccount },
                { $inc: { Balance: -amount } },
                { session }
            ); // Deduct the amount from the sender's balance.
        
            const updateReceiver = await userCollection.updateOne(
                { AccountNumber: receiverAccount },
                { $inc: { Balance: amount } },
                { session }
            ); // Add the amount to the receiver's balance.
        
            if (updateSender.modifiedCount === 1 && updateReceiver.modifiedCount === 1) {
                await session.commitTransaction(); // Commit the transaction if both updates are successful.
                res.status(200).json({ message: 'Transfer successful' }); // Return success response.
            } else {
                await session.abortTransaction(); // Abort transaction if any update fails.
                res.status(500).json({ message: 'Transfer failed' }); // Return error response.
            }
        
            } catch (err) {
            await session.abortTransaction(); // Abort transaction on error.
            console.error("Error during transfer:", err); // Log the error.
            res.status(500).json({ message: 'Internal server error' }); // Return a generic error response.
            } finally {
            session.endSession(); // End the session.
            }
    };

    exports.postdebitmoney = async(req, res) =>{
        const { senderAccount, receiverAccount, amount } = req.body; // get sender&reciever account number
    
    if (!senderAccount || !receiverAccount || !amount) {
      return res.status(400).json({ message: 'Please provide senderAccount, receiverAccount, and amount' }); // Return error if any required parameter is missing.
    }
  
    const db = client.db(dbName); // Get the database instance.
    const userCollection = db.collection(creditmoney); // Get the collection for user details.
  
    const session = client.startSession(); // Start a session for transaction management.
  
    try {
      session.startTransaction(); // Start a transaction.
      
      const sender = await userCollection.findOne({ AccountNumber: senderAccount }, { session }); // Find the sender account in the collection.
      console.log("Sender account query:", { AccountNumber: senderAccount });
    console.log("Sender found:", sender);
      const receiver = await userCollection.findOne({ AccountNumber: receiverAccount }, { session }); // Find the receiver account in the collection.
  
      if (!sender) {
        await session.abortTransaction(); // Abort transaction if sender account is not found.
        return res.status(404).json({ message: 'Sender account not found' }); // Return error response.
      }
  
      if (!receiver) {
        await session.abortTransaction(); // Abort transaction if receiver account is not found.
        return res.status(404).json({ message: 'Receiver account not found' }); // Return error response.
      }
  
      if (sender.balance < amount) {
        await session.abortTransaction(); // Abort transaction if sender has insufficient funds.
        return res.status(400).json({ message: 'Insufficient funds' }); // Return error response.
      }
  
      const updateSender = await userCollection.updateOne(
        { AccountNumber: senderAccount },
        { $inc: { Balance: -amount } },
        { session }
      ); // Deduct the amount from the sender's balance.
  
      const updateReceiver = await userCollection.updateOne(
        { AccountNumber: receiverAccount },
        { $inc: { Balance: amount } },
        { session }
      ); // Add the amount to the receiver's balance.
  
      if (updateSender.modifiedCount === 1 && updateReceiver.modifiedCount === 1) {
        await session.commitTransaction(); // Commit the transaction if both updates are successful.
        res.status(200).json({ message: 'Transfer successful' }); // Return success response.
      } else {
        await session.abortTransaction(); // Abort transaction if any update fails.
        res.status(500).json({ message: 'Transfer failed' }); // Return error response.
      }
  
    } catch (err) {
      await session.abortTransaction(); // Abort transaction on error.
      console.error("Error during transfer:", err); // Log the error.
      res.status(500).json({ message: 'Internal server error' }); // Return a generic error response.
    } finally {
      session.endSession(); // End the session.
    }
  };