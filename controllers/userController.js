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

exports.login = async(req, res) => {
    try{
        let credentials = req.body;
        let accountNumber = credentials.accountnumber;
        let Password = credentials.password;
        var user = await User.findOne({AccountNumber:accountNumber });
        if (user.Password == Password){
            res.status(200).json({message: 'Successfully logged in'})
        }
        else{
            res.status(403).json({message: 'Invalid Credentails'})
        }
    }
    catch(err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}