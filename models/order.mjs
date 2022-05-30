export default function initOrderModel(sequelize, DataTypes) {
	return sequelize.define(
		"order",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
			},
			deliveryFee: {
				type: DataTypes.DECIMAL(10, 2),
			},
			totalCost: {
				allowNull: false,
				type: DataTypes.DECIMAL(10, 2),
			},
			complete: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
			},
			paid: {
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
			tableName: "orders",
			underscored: true,
		}
	);
}
