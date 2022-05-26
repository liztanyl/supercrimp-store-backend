import db from "./models/index.mjs";

import initAdminUsersController from "./controllers/adminUsers.mjs";
import initUsersController from "./controllers/users.mjs";
import initProductsController from "./controllers/products.mjs";
import initColoursController from "./controllers/colours.mjs";
import initOrdersController from "./controllers/orders.mjs";

export default function bindRoutes(app) {
	const AdminUsersController = initAdminUsersController(db);
	const UsersController = initUsersController(db);
	const ProductsController = initProductsController(db);
	const ColoursController = initColoursController(db);
	const OrdersController = initOrdersController(db);

	//////////////
	/* CUSTOMER */
	//////////////
	app.get("/", (request, response) => {
		response.sendFile(resolve("dist", "main.html"));
	});

	// USER ACTIONS
	app.post("/profile", UsersController.edit);
	app.post("/login", UsersController.login);
	app.post("/signup", UsersController.signup);

	// RETRIEVE PRODUCTS
	app.get("/products", ProductsController.availableProducts); // customer /products endpoint retrieves only available products
	app.get("/product/:productId", ProductsController.product);

	// RETRIEVE COLOURS
	app.get("/colours", ColoursController.availableColours);

	// SUBMIT ORDER
	app.post("/checkout", OrdersController.checkout);

	///////////
	/* ADMIN */
	///////////
	app.get("/admin/", AdminUsersController.index); // not entirely sure how this works atm, seems like we might not need this?

	// LOGIN
	app.post("/admin/login", AdminUsersController.index);

	// RETRIEVE PRODUCTS
	app.get("/admin/products", ProductsController.allProducts); // admin /products endpoint retrieves ALL products

	// PRODUCT ACTIONS
	app.post("/admin/product/add", ProductsController.add);
	app.post("/admin/product/:product_id/edit", ProductsController.edit);

	// RETRIEVE COLOURS
	app.get("/admin/colours/", ColoursController.allColours);

	// COLOUR ACTIONS
	app.post("/admin/colour/add", ColoursController.add);
	app.post("/admin/colour/:colour_id/edit", ColoursController.edit);
}
