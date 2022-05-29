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
