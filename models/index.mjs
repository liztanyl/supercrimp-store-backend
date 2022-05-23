import { Sequelize } from "sequelize";
import allConfig from "../config/config.js";

import initAdminUserModel from "./adminUser.mjs";
import initUserModel from "./user.mjs";
import initOrderModel from "./order.mjs";
import initProductModel from "./product.mjs";
import initColourModel from "./colour.mjs";
import initOrderProductModel from "./orderProduct.mjs";

const env = process.env.NODE_ENV || "development";

const config = allConfig[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.AdminUser = initAdminUserModel(sequelize, Sequelize.Datatypes);
db.User = initUserModel(sequelize, Sequelize.Datatypes);
db.Order = initOrderModel(sequelize, Sequelize.Datatypes);
db.Product = initProductModel(sequelize, Sequelize.Datatypes);
db.Colour = initColourModel(sequelize, Sequelize.Datatypes);
db.OrderProduct = initOrderProductModel(sequelize, Sequelize.Datatypes);

db.Order.belongsTo(db.User);
db.User.hasMany(db.Order);

// uses order_product model for through table
db.Order.belongsToMany(db.Product, { through: db.OrderProduct });
db.Product.belongsToMany(db.Order, { through: db.OrderProduct });

// no product_colour model
db.Product.belongsToMany(db.Colour, { through: "products_colours" });
db.Colour.belongsToMany(db.Product, { through: "products_colours" });

db.OrderProduct.belongsTo(db.Colour);
db.Colour.hasMany(db.OrderProduct);

export default db;
