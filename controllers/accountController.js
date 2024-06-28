const mongoose = require('mongoose');
const Account = require('../models/account');
const AccountObj = require('../interfaces/account');
exports.getAccountBal = async (req, res) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);
        console.log(accountNumber);
        const account = await Account.findOne({AccountNumber:accountNumber});
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.createAccount = async (req,res)=>{
    try{
    let accountData = req.body;
    accountData.AccountCreated= new Date(accountData.AccountCreated).toString();
    accountData.LastTransaction = new Date(accountData.LastTransaction).toString();
    console.log("Request body is: " + JSON.stringify(req.body, null, 2));
    console.log("accountData is: " + JSON.stringify(accountData, null, 2));
    
    const account = new Account(accountData);
    console.log(account);
    const saved = await account.save();
    console.log("after save")
    if(saved){
        console.log("new Account",saved);
        res.status(201).json({ message: 'User details inserted successfully' });
    }
} catch(err) {
    console.error("Error:", err);
    res.status(500).json({ message: 'Internal server error' });
}
  };

    exports.findaccount = async (req, res)=>{
        
        try {
            const accountNumber = parseInt(req.params.accountNumber);            
            var account = await Account.findOne({ AccountNumber: accountNumber });
    
            if (account) {
                res.status(200).json(account);
            } else {
                res.status(404).json({ message: 'Account Not found' });
            }
        } catch(err) {
            console.error("Error:", err);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

exports.getuserinfo = async(req, res) =>{
    try {
        const accountNumber = parseInt(req.params.accountNumber);      
        var account = await Account.findOne({ AccountNumber: accountNumber });

        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: "User's Account Not found" });
        }
    } catch(err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}