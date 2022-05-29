<<<<<<< HEAD
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
=======
const formatOrder = (order) => {
  const { user, products } = order;
  const formattedProducts = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      currentPrice: product.currentPrice,
    };
  });

  return {
    id: order.id,
    totalCost: order.totalCost,
    deliveryFee: order.deliveryFee,
    complete: order.complete,
    createdAt: order.createdAt,
    products: formattedProducts,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      addressLine1: user.addressLine1,
      addressLine2: user.addressLine2,
      postalCode: user.postalCode,
      phone: user.phone,
    },
  };
};

export default function initOrdersController(db) {
  const pending = async (request, response) => {
    try {
      const orders = await db.Order.findAll({
        where: { complete: false },
        include: [
          { model: db.User },
          {
            model: db.OrderProduct,
            include: [{ model: db.Product }, { model: db.Colour }],
          },
        ],
      });

      // const dataToClient = orders.map((order) => formatOrder(order));
      console.log(orders);
      response.send(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const completed = async (request, response) => {
    try {
      // console.log(request.body);
      // const orders = await db.Order.findAll({
      //   where: { complete: true },
      // });
      // console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };
>>>>>>> f21fc4df6d560e795d05b2e80defa8da816a8b14

	const checkout = async (request, response) => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

<<<<<<< HEAD
	return {
		index,
		checkout,
	};
=======
  return {
    pending,
    completed,
    checkout,
  };
>>>>>>> f21fc4df6d560e795d05b2e80defa8da816a8b14
}
