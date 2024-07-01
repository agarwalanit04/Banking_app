// For Banker
// Banker can see his/Her profile through this

const express = require('express');
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


const client = new MongoClient(url, {
     useNewUrlParser: true, 
     useUnifiedTopology: true }
);

// Define the API endpoint to give an emp their details
app.get('/empdetails/:accountNumber', async (req, res) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);
        const db = client.db(dbName);
        const collection = db.collection(userdetailcollection);
        
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
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
