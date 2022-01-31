const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./utils/db');


const app = express();
const port = 3000;

app.use(cors());


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

require("./routes/admin.routes")(app);
require("./routes/student.routes")(app);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))