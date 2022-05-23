export default function initAdminUserModel(sequelize, DataTypes) {
  return sequelize.define(
    "admin_user",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      delivery_fee: {
        type: DataTypes.DECIMAL(10, 2),
      },
      total_cost: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      complete: {
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
    },
    {
      tableName: "admin_users",
      underscored: true,
    }
  );
}
