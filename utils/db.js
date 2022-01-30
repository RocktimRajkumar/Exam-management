const mongoose = require('mongoose');
require('dotenv/config')

// connect to db
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }, (err,success) => {
    if (success)
        console.log("connected to mongoose");
    else
        console.log("couldn't connect to the server ", err)
});