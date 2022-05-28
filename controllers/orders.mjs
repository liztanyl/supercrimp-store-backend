import { formatColour, formatProduct } from "./helperFunctions.mjs";

export default function initOrdersController(db) {
	const index = async (request, response) => {
		try {
			const orders = await db.Order.findAll({
				include: { model: db.OrderProduct, include: [db.Product, db.Colour] },
			});

			// TODO: format data before it's sent to client

			console.log(orders);
			response.send(orders);
		} catch (error) {
			console.log(error);
		}
	};

	const checkout = async (request, response) => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

	return {
		index,
		checkout,
	};
}
