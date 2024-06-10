// For Banker
// Pusrpose is to add an account

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
const userdetailcollection = 'user_table'; 

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

// Define the API endpoint to add an user
app.post('/userdetails', async (req, res) => {
    try {
        const userDetails = req.body;
        
        console.log("Request body is: " + JSON.stringify(req.body, null, 2));
        console.log("userDetails is: " + JSON.stringify(userDetails, null, 2));

        const db = client.db(dbName);
        const userCollection = db.collection(userdetailcollection);

        console.log("Searching email id: " + req.body.Email); // Correct: 'Email' with an uppercase 'E'
        const existingUser = await userCollection.findOne({ Email: req.body.Email }); // Correct: 'Email' with an uppercase 'E'
        console.log("existingUser: " + JSON.stringify(existingUser, null, 2)); 
        if (existingUser) {
          console.log("Returning 400: As this user already exists with this email");
          return res.status(400).json({ error: 'Email already exists.' });
        }

        const result = await userCollection.insertOne(userDetails);
        if (result.acknowledged === true) {
            console.log("Success: returning 200 " + JSON.stringify(result, null, 2));
            res.status(201).json({ message: 'User details inserted successfully' });
        } else {
            console.log("Failure: Insertion to DB failed");
            res.status(500).json({ message: 'Failed to insert User details' });
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
