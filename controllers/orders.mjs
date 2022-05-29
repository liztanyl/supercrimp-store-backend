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

  const checkout = async (request, response) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return {
    pending,
    completed,
    checkout,
  };
}
