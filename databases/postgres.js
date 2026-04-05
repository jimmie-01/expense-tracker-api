const dotenv = require('dotenv');
const express = require("express");
const router = express.Router();
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.HOST,
	database: "budget_tracker",
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
})

// Route to get all expenses
router.get('/expenses', async(req, res) => {
	try {
		const query = "SELECT * FROM expenses";
		const { rows } = pool.query(query);
		res.json(rows);
	} catch (err) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error"});
	}
})

// Routes to add new expenses

router.post('/expenses', async(req, res) => {
	try {
		const {name, amount, date } = req.body;
		const query = 'INSERT INTO expenses (name, amount, date) VALUES ($1, $2, $3) RETURNING *';
		const { rows } = await pool.query(query, [name, amount, date]);

		res.status(201).json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
})
module.exports = router;