const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        TransactionDate: String,
        TransactionType: String,
        PaidTo: Number,
        ReceivedFrom: Number,
        Amount: Number,

  });
  
  const Transaction= mongoose.model('Transaction',transactionSchema);
 
  module.exports = Transaction;