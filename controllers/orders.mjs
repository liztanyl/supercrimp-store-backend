import {
  formatOrder,
  generateHash,
  sendEmailToCustomer,
} from "./helperFunctions.mjs";

import dotenv from "dotenv";
import Stripe from "stripe";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default function initOrdersController(db) {
  const pending = async (request, response) => {
    try {
      const orders = await db.Order.findAll({
        where: { complete: false, paid: true },
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
        where: { complete: true, paid: true },
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

  const orderDetails = async (request, response) => {
    try {
      const { orderId } = request.params;

      const order = await db.Order.findOne({
        where: { id: orderId },
        include: [
          { model: db.User },
          { model: db.OrderProduct, include: [db.Product, db.Colour] },
        ],
      });

      const dataToClient = formatOrder(order);
      response.send(dataToClient);
    } catch (error) {
      console.log(error);
    }
  };

  const orderCompleted = async (request, response) => {
    try {
      const { id } = request.body;
      const completedOrder = await db.Order.update(
        { complete: true },
        {
          where: { id },
        }
      );

      response.send(completedOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const toPending = async (request, response) => {
    try {
      const { id } = request.body;
      const pendingOrder = await db.Order.update(
        { complete: false },
        {
          where: { id },
        }
      );

      response.send(pendingOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async (request, response) => {
    try {
      const { cart, userDetails } = request.body;

      delete userDetails.repeatPassword;
      const newUser = await db.User.create(userDetails, { returning: true });

      const calculateTotal = (previous, current) =>
        previous + current.subtotalCost;
      const totalCost = cart.reduce(calculateTotal, 0);

      const newOrderDetails = {
        userId: newUser.id,
        deliveryFee: 0,
        totalCost,
        complete: false,
        paid: false,
      };

      const newOrder = await db.Order.create(newOrderDetails, {
        returning: true,
      });

      cart.forEach((item) => (item.orderId = newOrder.id));
      await db.OrderProduct.bulkCreate(cart);

      // Getting details to send to Stripe

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
        success_url: `${FRONTEND_URL}/order/${newOrder.id}`,
        cancel_url: `${FRONTEND_URL}/checkout?error=payment`,
      });

      response.cookie(`orderId=${newOrder.id};`);
      response.cookie(`orderSubmitted=${generateHash(newOrder.id)};`);
      response.json({ url: session.url });
    } catch (error) {
      console.log(error.message);
      response.status(500).send(error.message);
    }
  };

  const completeCheckout = async (request, response) => {
    try {
      const { orderSubmitted, orderId } = request.body;

      if (generateHash(orderId) === orderSubmitted) {
        // check if order has already been paid for
        const prevPaidOrder = await db.Order.findOne({
          where: { id: orderId },
        });
        console.log(prevPaidOrder.paid);

        await db.Order.update({ paid: true }, { where: { id: orderId } });
        const paidOrder = await db.Order.findByPk(orderId, {
          include: [
            { model: db.User },
            { model: db.OrderProduct, include: [db.Product, db.Colour] },
          ],
        });
        response.send({ order: formatOrder(paidOrder) });

        if (!prevPaidOrder.paid) {
          // Sends email only once
          sendEmailToCustomer(formatOrder(paidOrder));
          sendEmailToCustomer(formatOrder(paidOrder), true);
          console.log("EMAIL IS BEING SENT FOR THE FIRST TIME");
        }
      } else {
        response.status(400);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500);
    }
  };

  return {
    pending,
    completed,
    orderDetails,
    orderCompleted,
    toPending,
    checkout,
    completeCheckout,
  };
}
