const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./utils/db');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load("./swagger.yaml")

const app = express();
const port = 3000;

app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

require("./routes/admin.routes")(app);
require("./routes/student.routes")(app);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))