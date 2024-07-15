const express = require('express');
const cors = require('cors');
// const app = express();
const {app} = require("./app")

const port=3000;
require('dotenv').config();

const corsOptions = {
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.get('/your-api-endpoint', (req, res) => {
    res.json({ message: 'Hello from the API' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});

