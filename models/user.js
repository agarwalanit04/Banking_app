const mongoose = require("mongoose");

const user = new mongoose.Schema(
    {
        Name: String,
        Role : String,
        AccountNumber : Number,
        Email: String,
        Phone : Number,
        Address : String,
        DOB : String,
        Password : String

  });
  
  const Userr= mongoose.model('user',user);
  //export default Account;
  module.exports = User;