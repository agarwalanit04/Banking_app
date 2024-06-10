
exports.getAccountNum = async (req, res) => {
    try {
        const accountNumber = parseInt(req.params.accountNumber);
        const db = client.db(dbName);
        const collection = db.collection(accountscollection);
        
        const account = await collection.findOne({ AccountNumber: accountNumber });

        if (account) {
            res.status(200).json({ balance: account.Balance });
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
  };
