const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;
const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, ()=> `Server listening on port: ${port}`);

module.exports = app;