// For User
// Shows User his/her balance
const express = require('express');
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const Account = require("./../models/account");

// Middleware to parse JSON bodies
app.use(express.json());

const client = new MongoClient(url, {
     useNewUrlParser: true, 
     useUnifiedTopology: true }
);

// Define the API endpoint to get the balance
app.get('/balance/:accountNumber', async (req, res) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);        
        const account = await collection.findOne({ AccountNumber: accountNumber });

        if (account) {
            res.status(200).json({ balance: account.Balance });
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
