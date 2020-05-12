const paypal = require('paypal-rest-sdk')
const userModel = require('../models/userModels')

exports.initializePaypalPayment = async (req, res) => {
	const create_payment_json = {
		intent: 'sale',
		payer: {
			payment_method: 'paypal'
		},
		redirect_urls: {
			return_url: 'http://localhost:3000/api/executePayment',
			cancel_url: 'http://localhost:3000/api/paymentCancelled'
		},
		transactions: [
			{
				item_list: {
					items: [
						{
							name: 'EmberMind Monthly Subscription',
							sku: '001',
							price: '30.00',
							currency: 'USD',
							quantity: 1
						}
					]
				},
				amount: {
					currency: 'USD',
					total: '30.00'
				},
				description: 'One month subscription to EmberMind.'
			}
		]
	}

	paypal.payment.create(create_payment_json, function(error, payment) {
		if (error) {
			throw error
		} else {
			for (let i = 0; i < payment.links.length; i++) {
				if (payment.links[i].rel === 'approval_url') {
					res.status(200).send({ paypalRedirectUrl: payment.links[i].href })
				}
			}
			// console.log('Payment Request')
			// console.log(payment)
		}
	})
}

exports.executePayment = async (req, res) => {
	const payerId = req.query.PayerID
	const paymentId = req.query.paymentId

	const execute_payment_json = {
		payer_id: payerId,
		transactions: [
			{
				amount: {
					currency: 'USD',
					total: '30.00'
				}
			}
		]
	}

	paypal.payment.execute(paymentId, execute_payment_json, async function(error, payment) {
		if (error) {
			console.error(error)
			res.status(500).redirect(`/payment-result?result=failed&message=Payment Failed&error-message=${error}`)
		} else {
			try {
				// console.log('Payment Response')
				// console.log(JSON.stringify(payment))
				await addPurchasedSubscriptionToDB(req, payment)
				res.status(200).redirect('/payment-result?result=success&message=Payment Successful')
			} catch (err) {
				console.error(err)
				res.status(500).redirect(`/payment-result?result=failed&message=Payment Failed&error-message=${error}`)
			}
		}
	})
}

const addPurchasedSubscriptionToDB = async (req, payment) => {
	try {
		await userModel.addPurchasedSubscriptionToDB({ userId: req.session.userId, paymentRecord: payment })
	} catch (err) {
		throw err
	}
}

exports.paymentCancelled = (req, res) => {
	res.status(409).redirect('/payment-result?result=cancelled&message=Purchase Cancelled')
}
