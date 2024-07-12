  const express = require("express");
  const mongoose = require('mongoose');
  const app = express();
  // require('dotenv').config();

  // Routes
  const accountRouter = require('./routers/accountRouter');
  const customerRouter = require('./routers/customerRouter');
  const transactionRouter = require('./routers/transactionRouter');
  const userRouter = require('./routers/userRouter');

  // MongoDB connection URL and Database Name
  const dbName = 'Banking';
  const accountscollection = 'accounts_table';

  // Middleware to parse JSON bodies
  app.use(express.json());

  async function connectToMongoDB(req, res, next) {
    try {
      const url = `mongodb+srv://${process.env.MONGODB_URL}/Banking?retryWrites=true&w=majority&appName=Cluster0`;
      console.log(url);
      mongoose.connect(url)
        .then(mongoClient => {
          console.log('MongoDB connected');
          next();
        })
        .catch(err => console.error(err));
    } catch (err) {
      console.error("Failed to connect to MongoDB", err);
      res.status(500).send({ message: "internal server error" });
    }
  }
  app.use(connectToMongoDB);

  app.use('/account', accountRouter);
  app.use('/customer', customerRouter);
  app.use('/transaction', transactionRouter);
  app.use('/user', userRouter);


//GET http://localhost:3000/user/balance/12334
//response



module.exports.app=app;

