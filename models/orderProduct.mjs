export default function initOrderProductModel(sequelize, DataTypes) {
	return sequelize.define(
		'order_product',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			orderId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'orders',
					key: 'id',
				},
			},
			productId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'products',
					key: 'id',
				},
			},
			colourId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'colours',
					key: 'id',
				},
			},
			quantity: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			subtotalCost: {
				type: DataTypes.DECIMAL(10, 2),
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
			tableName: 'orders_products',
			underscored: true,
		}
	);
}
