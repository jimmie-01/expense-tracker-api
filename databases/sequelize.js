const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

//Create an instance of sequelize and connec to DB

//const sequelize = new Sequelize(process.env.MYSQ_CONNECTION_STRING);

// or

const sequelize = new Sequelize('budget_tracker', 'razaq', 'lastname', {
	host: process.env.HOST,
	dialect: "postgres",
	port: 5432,
});

// Define the Expense model
const Expense = sequelize.define(
	'expense',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		amount: {
			type: DataTypes.NUMERIC,
			allowNull: false,
		},
		date: {
			type:DataTypes.DATE,
			allowNull: true
		},
	},
	{
		timestamps: false,
	}
)

// Synchronize the model with thw database
sequelize.sync({ forced: true });

// Route to get all expenses
router.get('/expenses', async (req, res) => {
	try {
		const expenses = await Expense.findAll();
		res.json(expenses);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
})

module.exports = router; 