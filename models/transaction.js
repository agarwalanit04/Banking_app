const mongoose = require("mongoose");

const transaction = new mongoose.Schema(
    {
        TransactionDate: String,
        TransactionType: String,
        PaidTo: Number,
        ReceivedFrom: Number,
        Amount: Number,

  });
  
  const Transaction= mongoose.model('transaction',transaction);
 
  module.exports = Transaction;