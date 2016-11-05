'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Chance = require('chance');
const chance = new Chance(Math.random);

const Order = db.define('orders', {
	confirmation_number: Sequelize.STRING,
	status: {
		type: Sequelize.ENUM,
		values: ['created', 'processing', 'cancelled', 'completed']
	},
	order_date: Sequelize.DATE
}, {
	hooks: {
		beforeValidate: (order, options) => {
			order.confirmation_number = chance.string({
				pool:'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
				length: 20
			});
      order.order_date = new Date();
      order.status = 'created';
    }
	}
})

module.exports = Order;