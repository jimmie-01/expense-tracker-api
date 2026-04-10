const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

//Create an instance of sequelize and connec to DB

//const sequelize = new Sequelize(process.env.MYSQ_CONNECTION_STRING);

// or

const sequelize = new Sequelize('budget_tracker', 'razaq', 'lastname', {
	host: process.env.HOST,
	dialect: "mysql"
});

// Define the Expense model
const Expense = sequelize.define(
	'expense',
	{
		
	}
)

module.exports = router;