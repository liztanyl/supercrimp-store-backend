const formatProduct = (product) => {
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
};

export default function initProductsController(db) {
  const allProducts = async (request, response) => {
    try {
      const products = await db.Product.findAll({
        include: db.Colour,
      });

      const dataToClient = products.map((product) => formatProduct(product));

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

      const dataToClient = products.map((product) => formatProduct(product));

      response.send(dataToClient);
    } catch (error) {
      console.log(error.message);
    }
  };

  const product = async (request, response) => {
    try {
      console.log(request.params);
      const { productId } = request.params;
      console.log(productId);
      const product = await db.Product.findOne({
        where: {
          id: productId,
        },
        include: db.Colour,
      });

      const dataToClient = formatProduct(product);

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
      const { id, name, description, usualPrice, currentPrice } = request.body;
      const updatedProduct = await db.Product.update(
        {
          name,
          description,
          currentPrice,
          usualPrice,
        },
        { where: { id } }
      );
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
