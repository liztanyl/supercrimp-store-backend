export default function initUserModel(sequelize, DataTypes) {
	return sequelize.define(
		'user',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				type: DataTypes.STRING,
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			addressLine1: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			addressLine2: {
				type: DataTypes.STRING,
			},
			postalCode: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			phone: {
				allowNull: false,
				type: DataTypes.STRING,
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
			tableName: 'users',
			underscored: true,
		}
	);
}
