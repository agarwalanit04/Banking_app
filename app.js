const express = require("express");
const mongoose = require('mongoose');
const app = express();
// Routes
const balanceRouter = require('./routers/balanceRouter');
// MongoDB connection URL and Database Name
const dbName = 'Banking';
const accountscollection = 'accounts_table';
// Middleware to parse JSON bodies
app.use(express.json());

async function connectToMongoDB(req, res, next) {
  try {
       const url = `mongodb+srv://${process.env.MONGODB_URL}/?retryWrites=true&w=majority&appName=Cluster0`;
       mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('MongoDB connected');
         next()
       }).catch(err => console.error(err));
  } catch (err) {
      console.error("Failed to connect to MongoDB", err);
      res.status(500).send({message:"internal server error"});
  }
 }
 
app.use(connectToMongoDB);


app.use('/balance', balanceRouter);




module.exports.app=app;
