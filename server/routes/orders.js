'use strict'

const epilogue = require('APP/server/epilogue');
const Bluebird = require('bluebird');

const db = require('APP/db');
const productModel = db.model('products');
const addressModel = db.model('addresses');
const userModel = db.model('users');
const creditCardModel = db.model('creditCards');
const orderModel = db.model('orders');
const lineItemModel = db.model('lineItems');
const cartProductModel = db.model('cartProducts');

const customOrdersRoutes = require('express').Router() 
module.exports = customOrdersRoutes

// // Epilogue will automatically create standard RESTful routes
// const orders = epilogue.resource({
// 	model: db.model('orders'),
// 	include: [
		// 	{ model: addressModel, as: 'shipping_address', required: false },
		// 	{ model: addressModel, as: 'billing_address', required: false },
		// 	{ model: creditCardModel, include:[{ model: userModel }], required: false },
		// 	{ model: userModel, required: false },
		// 	{ model: lineItemModel }
		// ],
// 	endpoints: ['/orders', '/orders/:id']
// });


customOrdersRoutes.get('/:id', (req,res,next) => {
	console.log(new Date())
	orderModel.findOne({
		where: {id: req.params.id},
		include: [{model: lineItemModel, include: [{model: productModel}]}]
	})
	.then(result => res.send(result))
	.catch(next);
})

customOrdersRoutes.post('/', (req,res,next) => {

	orderModel.findOrCreate({
		where: {},
		include: [
			{ model: addressModel, as: 'shipping_address', required: false },
			{ model: addressModel, as: 'billing_address', required: false },
			{ model: creditCardModel, include:[{ model: userModel }], required: false },
			{ model: userModel, required: false },
			{ model: lineItemModel }
		]})
	.spread(order => {
		return addressModel
			.findOrCreate({where: req.body.billing_address})
			.spread(addressInfo => order.setBilling_address(addressInfo))
			.catch(next)
	})
	.then(order => {
		return addressModel
			.findOrCreate({where: req.body.shipping_address})
			.spread(addressInfo => order.setShipping_address(addressInfo))
			.catch(next)
	})
	.then(order => {
		return creditCardModel
			.findOrCreate({where: req.body.creditCard})
			.spread(creditCardInfo => order.setCreditCard(creditCardInfo))
			.catch(next)
	})
	.then(order => {
		return cartProductModel.getCartProducts(req.sessionID)
			.then(cartProducts => {
				Bluebird.map(cartProducts, cartProduct => {
					lineItemModel.create({
						quantity: cartProduct.quantity,
						order_id: order.id,
						product_id: cartProduct.product_id,
						price: cartProduct.product.price
					})
					.then(() => {
						console.log(cartProduct.id)
						cartProductModel.destroy({where: {id: cartProduct.id}})
					})
					.catch(next)
				})

			})
			.then(() => res.status(201).send(order))
			
	})
	.catch(next)

// 	// 	getcart()
// 	// createlineItems.setOrder
// 	// clearcart

})





	// .then(order => {
	// 	let lineItem = {order_id: order.id}

	// 	return cartProductModel.getCartProducts(req.sessionID)
	// 	.then(cartProducts => {
	// 		Bluebird.map(cartProducts, cartProduct => 
	// 			lineItemModel.create({
	// 				quantity: cartProduct.quantity, 
	// 				order_id: order.id,
	// 				product_id: cartProduct.product_id
	// 			}))
	// 			.then(createdLineItem => {
	// 				productModel.findById(createdLineItem.product_id)
	// 				.then(product => createdLineItem.update({price: product.price}))
	// 				.catch(next)
	// 			})
	// 			.catch(next)
	// 	})

	// 	.catch(next)
	// })