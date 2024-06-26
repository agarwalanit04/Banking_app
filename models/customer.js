const mongoose = require("mongoose");

const customer = new mongoose.Schema(
    {
        Name: String,
        phone: String,
        Address: String,
        PANNo: String,
        AdharNumber: String,

  });
  
  const Customer= mongoose.model('customer',customer);
  //export default Account;
  module.exports = Customer;