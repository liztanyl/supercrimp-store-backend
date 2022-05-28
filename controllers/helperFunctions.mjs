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
