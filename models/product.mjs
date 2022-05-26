export default function initProductModel(sequelize, DataTypes) {
  return sequelize.define(
    "product",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      usualPrice: {
        type: DataTypes.DECIMAL(10, 2),
      },
      currentPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      available: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "products",
      underscored: true,
    }
  );
}
