const mongoose = require("mongoose");
const {ObjectId } = require("mongodb");
//const Customer = require("../interfaces/customer");
const account = new mongoose.Schema(
    {
        AccountNumber : Number,
        AccountType : String,
        Balance : String,
        LastTransaction : Date,
        AccountCreated : Date,
        AccountHolder_Type : String,
        Holder: ObjectId
  });
  
  const Account= mongoose.model('account',account);
  //export default Account;
  module.exports = Account;