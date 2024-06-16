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
    accountData.AccountCreated= new Date(accountData.AccountCreated);
    accountData.LastTransaction = new Date(accountData.LastTransaction);
    console.log("Request body is: " + JSON.stringify(req.body, null, 2));
    console.log("accountData is: " + JSON.stringify(accountData, null, 2));

    //const db = client.db(dbName);
    //const userCollection = db.collection(userdetailcollection);

    // console.log("Searching email id: " + req.body.Email); // Correct: 'Email' with an uppercase 'E'
    // const existingUser = await userCollection.findOne({ Email: req.body.Email }); // Correct: 'Email' with an uppercase 'E'
    // console.log("existingUser: " + JSON.stringify(existingUser, null, 2)); 
    // if (existingUser) {
    //   console.log("Returning 400: As this user already exists with this email");
    //   return res.status(400).json({ error: 'Email already exists.' });
    // }

    //const result = await userCollection.insertOne(userDetails);
    // if (result.acknowledged === true) {
    //     console.log("Success: returning 200 " + JSON.stringify(result, null, 2));
    //     res.status(201).json({ message: 'User details inserted successfully' });
    // } else {
    //     console.log("Failure: Insertion to DB failed");
    //     res.status(500).json({ message: 'Failed to insert User details' });
    // }
    /**
     *  AccountNumbers;
        AccountType;
        Balance;
        LastTransaction;
        AccountCreated;
        AccountHolder_Type;
        Holder
     */
    
    const account = new Account(accountData);
    const saved = await account.save();
    if(saved){
        console.log("new Account",saved);
        res.status(201).json({ message: 'User details inserted successfully' });
    }
} catch(err) {
    console.error("Error:", err);
    res.status(500).json({ message: 'Internal server error' });
}
  }

//   exports.AddBalc = async (req, res) => {
//     try {
//         const accountNumber = parseInt(req.params.accountNumber);
//         console.log(accountNumber);
//         const account = await Account.findOne({AccountNumber:accountNumber});
//         if (account) {
//             res.status(200).json(account);
//         } else {
//             res.status(404).json({ message: 'Account not found' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
//   };
