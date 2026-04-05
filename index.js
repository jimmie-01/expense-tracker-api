const dotenv = require("dotenv");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const pgRouter = require('./databases/postgres');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(pgRouter);

app.listen(8000, () => {
	console.log(`App Listening for request on Port 8000 `)
});