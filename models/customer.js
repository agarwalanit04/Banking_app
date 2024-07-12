const mongoose = require("mongoose");
const {ObjectId } = require("mongodb");
const customer = new mongoose.Schema(
    {
        AccountNumber: Number,
        Name: String,
        Email: String,
        phone: String,
        Address: String
  });
  
  const Customer= mongoose.model('customer',customer);
  //export default Account;
  module.exports = Customer;