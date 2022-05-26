const formatColour = (colour) => {
  return {
    id: colour.id,
    name: colour.name,
    code: colour.colourCode,
  };
};

export default function initColoursController(db) {
  const allColours = async (request, response) => {
    try {
      const colours = await db.Colour.findAll();

      const dataToClient = colours.map((colour) => formatColour(colour));

      console.log(dataToClient);
      response.send(dataToClient);
    } catch (error) {
      console.log(error.message);
    }
  };

  const availableColours = async (request, response) => {
    try {
      const colours = await db.Colour.findAll({
        where: { available: true },
      });

      const dataToClient = colours.map((colour) => formatColour(colour));

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
    allColours,
    availableColours,
    add,
    edit,
  };
}
