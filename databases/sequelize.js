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
	logging: false,
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
		const expenses = await Expense.findAll({
			order: [['id', 'ASC']],
		});
		res.json(expenses);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
})

// Route to add new expenses
router.post('/expenses', async (req, res) => {
	try {
		const { name, amount, date } = req.body;
		const expense = await Expense.create({ name, amount, date });
		await expense.save();
		res.status(201).json({ message: 'New expense added' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Route to update expenses
router.put('/expenses/:id', async (req, res)=> {
	try {
		const expense = await Expense.findByPk(req.params.id);
		if (expense) {
			const {name, amount, date } = req.body;
			expense.name = name;
			expense.amount = amount;
			expense.date = date;

			await expense.save();
			res.status(201).json({ message: 'expense updated successfully!' });
		} else {
			res.status(404).json({ error: 'Expense not found !' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
})

// Route to delete expenses
router.delete('/expenses/:id', async (req, res) => {
	try {
		const expense = await findOne({
			where: {
				id: req.params.id,
			},
		});

		if(expense) {
			await expense.destroy();
			res.json({ message: 'Expense deleted ' });
		} else {
			res.status(404).json({ message: 'Expense not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error'});
	}
})
module.exports = router; 