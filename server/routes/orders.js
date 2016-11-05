'use strict'

const epilogue = require('APP/server/epilogue');
const db = require('APP/db');
const productModel = db.model('products');
const addressModel = db.model('addresses');
const userModel = db.model('users');
const creditCardModel = db.model('creditCards');
const orderModel = db.model('orders');
const lineItemModel = db.model('lineItems');
const Bluebird = require('bluebird');

const customOrdersRoutes = require('express').Router() 
module.exports = customOrdersRoutes

// // Epilogue will automatically create standard RESTful routes
// const orders = epilogue.resource({
// 	model: db.model('orders'),
// 	include: [
// 			{ 
// 				model: addressModel, 
// 				as: 'shipping_address', 
// 				required: false 
// 			},
// 			{ 
// 				model: addressModel, 
// 				as: 'billing_address', 
// 				required: false 
// 			},
// 			{ 
// 				model: creditCardModel, 
// 				include:[{ model: userModel }],
// 				required: false 
// 			},
// 			{ 
// 				model: userModel, 
// 				required: false 
// 			},
// 			{
// 				model: lineItemModel
// 			}
// 	],
// 	endpoints: ['/orders', '/orders/:id']
// });


customOrdersRoutes.get('/:id', (req,res,next) => {
	orderModel.findOne({
		where: {id: req.params.id},
		include: [{model: lineItemModel, include: [{model: productModel}]}]
	})
	.then(result => res.send(result))
	.catch(next);
})

customOrdersRoutes.post('/', (req,res,next) => {
	orderModel.create(req.body.order)
	.then(order => {
		return addressModel
				.findOrCreate({where: req.body.billing_address})
				.spread((addressInfo, created) => order.setBilling_address(addressInfo))
				.catch(next)
	})
	.then(order => {
		return addressModel
				.findOrCreate({where: req.body.shipping_address})
				.spread((addressInfo, created) => order.setShipping_address(addressInfo))
				.catch(next)
	})
	.then(order => {
		return creditCardModel
				.findOrCreate({where: req.body.creditCard})
				.spread((creditCardInfo, created) => {
					order.setCreditCard(creditCardInfo)
					return res.send(order)
				})
				.catch(next)
	})
	.catch(next)

})
