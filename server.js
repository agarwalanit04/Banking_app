const {app} = require("./app")
const port=3000;
require('dotenv').config();


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
