import { formatProduct } from "./helperFunctions.mjs";

const getColourQueries = async (db, colours) => {
	return await db.Colour.findAll({
		where: { id: colours.map((colour) => colour.id) },
	});
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

			if (products.length) {
				const dataToClient = products.map((product) => formatProduct(product));
				response.send(dataToClient);
			} else {
				response.status(404).send("Something went wrong");
			}
		} catch (error) {
			console.log(error.message);
			response.status(404).send("Something went wrong");
		}
	};

	const product = async (request, response) => {
		try {
			const { productId } = request.params;
			const product = await db.Product.findOne({
				where: { id: productId },
				include: db.Colour,
			});

			const dataToClient = formatProduct(product);
			response.send(dataToClient);
		} catch (error) {
			console.log(error.message);
			response.status(404).send("Something went wrong");
		}
	};

	const add = async (request, response) => {
		try {
			const {
				name,
				description,
				features,
				outerDimensions,
				mounting,
				materials,
				usualPrice,
				currentPrice,
				available,
				colours,
			} = request.body;

			const newProduct = await db.Product.create({
				name,
				description,
				features,
				outerDimensions,
				mounting,
				materials,
				currentPrice,
				usualPrice,
				available,
			});

			const productColours = await getColourQueries(db, colours);
			newProduct.addColours(productColours);

			response.send("Added product");
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	const edit = async (request, response) => {
		try {
			const {
				id,
				name,
				description,
				features,
				outerDimensions,
				mounting,
				materials,
				usualPrice,
				currentPrice,
				available,
				colours,
			} = request.body;

			const product = await db.Product.findOne({
				where: { id },
				include: db.Colour,
			});

			// update non-colour product fields
			await db.Product.update(
				{
					name,
					description,
					features,
					outerDimensions,
					mounting,
					materials,
					currentPrice,
					usualPrice,
					available,
				},
				{ where: { id } }
			);

			const currentColourIds = formatProduct(product).colours.map(
				(colour) => colour.id
			);
			const newColourIds = colours.map((colour) => colour.id);

			const updateQueries = [];
			// if the current colour is not in new ids:
			currentColourIds.forEach((id) => {
				if (!newColourIds.includes(id)) {
					updateQueries.push(product.removeColour(id));
				}
			});
			// if the new colour is not in current ids:
			newColourIds.forEach((id) => {
				if (!currentColourIds.includes(id)) {
					updateQueries.push(product.addColour(id));
				}
			});

			await Promise.all(updateQueries);
			response.send("Item updated");
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	const deleteProduct = async (request, response) => {
		try {
			const { id } = request.body;

			const productToDelete = await db.Product.findOne({
				where: { id },
			});

			await productToDelete.setColours([]);
			await productToDelete.destroy();

			response.send({});
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	return {
		allProducts,
		availableProducts,
		product,
		add,
		edit,
		deleteProduct,
	};
}
