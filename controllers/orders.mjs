import { formatOrder } from "./helperFunctions.mjs";

import dotenv from "dotenv";
import Stripe from "stripe";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default function initOrdersController(db) {
	const pending = async (request, response) => {
		try {
			const orders = await db.Order.findAll({
				where: { complete: false },
				include: [
					{ model: db.User },
					{ model: db.OrderProduct, include: [db.Product, db.Colour] },
				],
			});

			const dataToClient = orders.map((order) => formatOrder(order));
			response.send(dataToClient);
		} catch (error) {
			console.log(error);
		}
	};

	const completed = async (request, response) => {
		try {
			const orders = await db.Order.findAll({
				where: { complete: true },
				include: [
					{ model: db.User },
					{ model: db.OrderProduct, include: [db.Product, db.Colour] },
				],
			});

			const dataToClient = orders.map((order) => formatOrder(order));
			response.send(dataToClient);
		} catch (error) {
			console.log(error);
		}
	};

	const checkout = async (request, response) => {
		try {
			const { cart } = request.body;

			const products = await db.Product.findAll({ where: { available: true } });
			const colours = await db.Colour.findAll({ where: { available: true } });

			const formatLineItems = (item) => {
				const product = products.find(
					(product) => product.id === item.productId
				);
				const colour = colours.find((colour) => colour.id === item.colourId);
				return {
					price_data: {
						currency: "sgd",
						product_data: {
							name: `${product.name} (${colour.name})`,
						},
						unit_amount: Number(product.currentPrice) * 100, // price in cents
					},
					quantity: item.quantity,
				};
			};

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				mode: "payment",
				line_items: cart.map((item) => formatLineItems(item)),
				success_url: `${FRONTEND_URL}/checkout-success`,
				cancel_url: `${FRONTEND_URL}/checkout?error=payment`,
			});

			response.json({ url: session.url });
		} catch (error) {
			console.log(error.message);
			response.status(500).send(error.message);
		}
	};

	return {
		pending,
		completed,
		checkout,
	};
}
