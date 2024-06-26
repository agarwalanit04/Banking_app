const mongoose = require('mongoose');
const Customer = require('../models/customer');
const CustomerObj = require('../interfaces/customer');
exports.getlistofuseraccounts = async (req, res) => {    
    try {
        // const accountNumber = parseInt(req.params.accountNumber);
        const users = await collection.find({}).toArray();
        if (users.length>0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'User Account Not found' });
        }
    } catch(err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}