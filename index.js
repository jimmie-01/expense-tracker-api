const dotenv = require("dotenv");
const express = require('express');

const pgRouter = require('./databases/postgres');

dotenv.config();

app.use('/pg', pgRouter);

app.listen(3000, () => {
	console.log(`App Listening for request on Port ${PORT} `)
});