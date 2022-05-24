export default function initColourModel(sequelize, DataTypes) {
	return sequelize.define(
		'colour',
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
			colourCode: {
				allowNull: false,
				type: DataTypes.STRING,
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
			tableName: 'colours',
			underscored: true,
		}
	);
}
