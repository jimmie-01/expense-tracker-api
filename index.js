const express = require('express');

const pgRouter = require('./databases/postgres');

app.use('/pg', pgRouter);

app.listen(3000, () => {
	console.log(`App Listening for request on Port ${PORT} `)
});