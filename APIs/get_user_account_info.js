// For User
// Show user their profile

const express = require('express');
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const Account = require("./../models/account");

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URL and Database Name
const url = 'mongodb+srv://agarwalanit04:hr26ap2791@cluster0.hba2zri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'Banking';
const userinfo = 'user_table'; 

const client = new MongoClient(url, {
     useNewUrlParser: true, 
     useUnifiedTopology: true }
);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected successfully to server");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

// Define the API endpoint to find an account
app.get('/userpersonaldetails/:accountNumber', async (req, res) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);
        const db = client.db(dbName);
        const collection = db.collection(userinfo);
        
        var account = await collection.findOne({ AccountNumber: accountNumber });

        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: "User's Account Not found" });
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
