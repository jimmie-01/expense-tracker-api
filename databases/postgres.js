const express = require("express");
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.HOST,
	database: "budget_tracker",
	password: process.env.PASSWORD,
	port: process.env.PORT,
})

// Route to get all expenses
router.get('/expenses', async(req, res) => {
	try {
		const query = "SELECT * FROM expenses";
		const { rows } = Pool.query(query);
		res.json(rows);
	} catch (err) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error"});
	}
})

// Routes to add new expenses

router.post('/expenses', async(req, res) => {

})
module.exports = router;