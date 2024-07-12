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

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});

