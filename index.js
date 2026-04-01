const dotenv = require("dotenv");
const express = require('express');
const app = express();

const pgRouter = require('./databases/postgres');

dotenv.config();

app.use('/pg', pgRouter);

app.listen(8000, () => {
	console.log(`App Listening for request on Port 8000 `)
});