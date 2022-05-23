export default function initOrderProductModel(sequelize, DataTypes) {
  return sequelize.define(
    "order_product",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },
      colour_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "colours",
          key: "id",
        },
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      subtotal_cost: {
        type: DataTypes.DECIMAL(10, 2),
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "orders_products",
      underscored: true,
    }
  );
}
