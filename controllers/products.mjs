const formatProduct = (products) => {
  return products.map((product) => {
    const colours = product.colours.map((colour) => {
      return {
        id: colour.id,
        name: colour.name,
        colourCode: colour.colour_code,
      };
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      usualPrice: product.usual_price,
      currentPrice: product.current_price,
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

      const dataToClient = formatProduct(products);

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

      const dataToClient = formatProduct(products);

      response.send(dataToClient);
    } catch (error) {
      console.log(error.message);
    }
  };

  const product = async (request, response) => {
    try {
    } catch (error) {
      console.log(error);
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
