const mongoose = require('mongoose');
const Customer = require('../models/customer');
const CustomerObj = require('../interfaces/customer');
exports.getlistofuseraccounts = async (req, res) => {    
    try {
        // Fetch all customer accounts
        const customers = await Customer.find({});
        if (customers.length > 0) {
            res.status(200).json(customers);
        } else {
            res.status(404).json({ message: 'User Accounts Not Found' });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};