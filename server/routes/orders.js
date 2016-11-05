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


// orders.create.fetch((req,res,context) => {
// 	orderModel.create(req.body.order)
// 	.then(order => {
// 		return addressModel
// 				.findOrCreate({where: req.body.billing_address})
// 				.spread((addressInfo, created) => order.setBilling_address(addressInfo))
// 				.catch(context)
// 	})
// 	.then(order => {
// 		return addressModel
// 				.findOrCreate({where: req.body.shipping_address})
// 				.spread((addressInfo, created) => order.setShipping_address(addressInfo))
// 				.catch(context)
// 	})
// 	.then(order => {
// 		return creditCardModel
// 				.findOrCreate({where: req.body.creditCard})
// 				.spread((creditCardInfo, created) => {
// 					order.setCreditCard(creditCardInfo)
// 					return res.send(order)
// 				})
// 				.catch(context)
// 	})
// 	.catch(context)

// })


// sample req.body obj
const reqBody1 = 
{
	"order": {
		"confirmation_number": "uDALSdsafasR",
		"status": "completed",
		"order_date": "2085-05-27T02:31:40.236Z"
	},
	"shipping_address": {
		"street1": "831 Vela Avenuessdf",
		"street2": "(261)",
		"city": "Evivarnow",
		"state": "IA",
		"zip": "00276"
	},
	"billing_address": {
		"street1": "737 Deet View",
		"street2": "(468)",
		"city": "Cislipal",
		"state": "KS",
		"zip": "57382"
	},
	"creditCard": {
		"id": "1",
		"number": "5130933397360722",
		"expiry_date": "11/2023",
		"security_code": "692"
	},
	"user": {
		"first_name": "Inez",
		"last_name": "Taylor",
		"email": "bu@zaj.ax",
		"password_digest": "$2a$10$WJW4VnanT1r.jUsAadmPXeB/0FLNmJLv5iAZaFQqcoyYkthdf1LZi",
		"shipping_address_id": "3",
		"billing_address_id": "4"
	}
}