export default function initProductModel(sequelize, DataTypes) {
  return sequelize.define("product", {
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
      type: DataTypes.STRING,
    },
    usual_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    current_price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    available: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
}
