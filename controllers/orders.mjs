import { formatOrder } from "./helperFunctions.mjs";

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
