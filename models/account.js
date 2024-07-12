const mongoose = require("mongoose");
const {ObjectId } = require("mongodb");
const account = new mongoose.Schema(
    {
        AccountNumber : Number,
        AccountType : String,
        Balance : Number,
        LastTransaction : String,
        AccountCreated : String,
        AccountHolder_Type : String,
        Holder: ObjectId
  });
  
  const Account= mongoose.model('account',account);
  //export default Account;
  module.exports = Account;