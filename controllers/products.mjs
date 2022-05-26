const formatProducts = (products) => {
  return products.map((product) => {
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
      usualPrice: product.usualPrice,
      currentPrice: product.currentPrice,
      available: product.available,
      colours,
    };
  });
};

export default function initProductsController(db) {
  const allProducts = async (request, response) => {
    try {
      const products = await db.Product.findAll({
        include: db.Colour,
      });

      const dataToClient = formatProducts(products);
      console.log(dataToClient);
      response.send(dataToClient);
    } catch (error) {
      console.log(error.message);
    }
  };

  const availableProducts = async (request, response) => {
    try {
      const products = await db.Product.findAll({
        where: { available: true },
        include: db.Colour,
      });

      const dataToClient = formatProducts(products);

      response.send(dataToClient);
    } catch (error) {
      console.log(error.message);
    }
  };

  const product = async (request, response) => {
    try {
      const { product_id } = request.params;
      const product = await db.Product.findOne({
        where: {
          id: product_id,
        },
        include: db.Colour,
      });
      const dataToClient = formatProducts([product])[0];
      console.log(dataToClient);
      response.send(dataToClient);
    } catch (error) {
      console.log(error.message);
    }
  };

  const add = async (request, response) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const edit = async (request, response) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return {
    allProducts,
    availableProducts,
    product,
    add,
    edit,
  };
}
