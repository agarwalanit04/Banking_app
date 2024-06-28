// For User
// Shows User their Transaction History

const express = require('express');
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const Transaction = require("./../models/transaction");

// Middleware to parse JSON bodies
app.use(express.json());

const client = new MongoClient(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true }
);

// Define the API endpoint to get the transaction history of the user
app.get('/transaction/:accountNumber', async (req, res) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);        
        var account = await account.findOne({ AccountNumber: accountNumber });

        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Account Not found' });
        }
    } catch(err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});