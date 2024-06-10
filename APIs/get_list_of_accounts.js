// For Banker
// Provide The banker with the list of users and their details

const express = require('express');
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URL and Database Name
const url = 'mongodb+srv://agarwalanit04:hr26ap2791@cluster0.hba2zri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'Banking';
const userlistcollection = 'user_list_banker'; 

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

connectToMongoDB();

// Define the API endpoint to get the user list for banker
app.get('/listofuseraccounts', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection(userlistcollection);
        
        const users = await collection.find({}).toArray();

        // var account = await collection.findOne({ AccountNumber: accountNumber });

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
