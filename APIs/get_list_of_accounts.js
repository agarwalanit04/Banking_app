// For Banker
// Provide The banker with the list of users and their details
const express = require('express');
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const Customer = require("./../models/customer");

// Middleware to parse JSON bodies
app.use(express.json());

const client = new MongoClient(url, {
     useNewUrlParser: true, 
     useUnifiedTopology: true }
);

// Define the API endpoint to get the user list for banker
app.get('/listofuseraccounts', async (req, res) => {
    try {
        const account = await account.find({}).toArray();
        
        if (users.length>0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'User Account Not found' });
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


