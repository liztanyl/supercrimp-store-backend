export default function initColoursController(db) {
	const allColours = async (request, response) => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

	const availableColours = async (request, response) => {
		try {
			const colours = await db.Colour.findAll({ where: { available: true } });
			const dataToClient = colours.map((colour) => {
				return {
					id: colour.id,
					name: colour.name,
					code: colour.colourCode,
				};
			});
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
