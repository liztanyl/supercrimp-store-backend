import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import jsSHA from "jssha";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SALT = process.env.SALT;
const SUPERCRIMP_EMAIL_ADDRESS = "supersupersupercrimp@gmail.com";
const SUPERCRIMP = "Supercrimp";
const TO_CUSTOMER_EMAIL_TEMPLATE_ID = "d-ab89c6a5703248d59760e71a1f5bf3d0";
const TO_ADMIN_EMAIL_TEMPLATE_ID = "d-3fdaefaa84f641a7a956220885c2aa7d";

export function generateHash(password) {
  const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  shaObj.update(SALT + password);
  const hash = shaObj.getHash("HEX");
  return hash;
}

export function sendEmailToCustomer(paidOrder, toAdmin) {
  const { user } = paidOrder;

  const emailContent = {
    to: {
      email: user.email,
      name: user.name,
    },
    from: {
      email: SUPERCRIMP_EMAIL_ADDRESS,
      name: SUPERCRIMP,
    },
    templateId: TO_CUSTOMER_EMAIL_TEMPLATE_ID,
    dynamicTemplateData: paidOrder,
  };

  if (toAdmin) {
    emailContent.to.email = SUPERCRIMP_EMAIL_ADDRESS;
    emailContent.to.name = SUPERCRIMP;
    emailContent.templateId = TO_ADMIN_EMAIL_TEMPLATE_ID;
  }

  console.log(emailContent);

  sgMail
    .send(emailContent)
    .then((response) => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

export function formatColour(colour) {
  return {
    id: colour.id,
    name: colour.name,
    code: colour.colourCode,
    available: colour.available,
  };
}

export function formatProduct(product) {
  const colours = product.colours.map((colour) => {
    return {
      id: colour.id,
      name: colour.name,
      code: colour.colourCode,
    };
  });

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    features: product.features,
    outerDimensions: product.outerDimensions,
    mounting: product.mounting,
    materials: product.materials,
    usualPrice: product.usualPrice,
    currentPrice: product.currentPrice,
    available: product.available,
    colours,
  };
}

export function formatProductForOrder(product) {
  return {
    id: product.id,
    name: product.name,
    usualPrice: product.usualPrice,
    currentPrice: product.currentPrice,
    available: product.available,
  };
}

export function formatUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    addressLine1: user.addressLine1,
    addressLine2: user.addressLine2,
    postalCode: user.postalCode,
    phone: user.phone,
  };
}

function formatOrderProduct(orderProduct) {
  return {
    colour: formatColour(orderProduct.colour),
    product: formatProductForOrder(orderProduct.product),
    quantity: orderProduct.quantity,
  };
}

export function formatOrder(order) {
  const products = order["order_products"].map((orderProduct) =>
    formatOrderProduct(orderProduct)
  );

  return {
    id: order.id,
    totalCost: order.totalCost,
    deliveryFee: order.deliveryFee,
    complete: order.complete,
    createdAt: order.createdAt,
    user: formatUser(order.user),
    products: products,
  };
}
