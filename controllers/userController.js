const mongoose = require('mongoose');
const User = require('../models/user');
const UserObj = require('../interfaces/user');

exports.getempdetails = async(req,res) =>{
    try {
        const accountNumber = parseInt(req.params.accountNumber);        
        var account = await collection.findOne({ AccountNumber: accountNumber });

        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: "Banker's Account Not found" });
        }
    } catch(err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getuserinfo = async(req, res) =>{
    try {
        console.log("start");
        const accountNumber = parseInt(req.params.accountNumber);     
        console.log(accountNumber); 
        var users = await User.findOne({AccountNumber:accountNumber });

        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "User's Details Not found" });
        }   
    } catch(err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
