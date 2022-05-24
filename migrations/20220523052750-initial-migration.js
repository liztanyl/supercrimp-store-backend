'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('admin_users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			address_line_1: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			address_line_2: {
				type: Sequelize.STRING,
			},
			postal_code: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			phone: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable('orders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id',
				},
			},
			delivery_fee: {
				type: Sequelize.DECIMAL(10, 2),
			},
			total_cost: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 2),
			},
			complete: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable('products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			usual_price: {
				type: Sequelize.DECIMAL(10, 2),
			},
			current_price: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 2),
			},
			available: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable('colours', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			available: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			colour_code: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable('orders_products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			order_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'orders',
					key: 'id',
				},
			},
			product_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'products',
					key: 'id',
				},
			},
			colour_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'colours',
					key: 'id',
				},
			},
			quantity: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			subtotal_cost: {
				type: Sequelize.DECIMAL(10, 2),
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable('products_colours', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			product_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'products',
					key: 'id',
				},
			},
			colour_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'colours',
					key: 'id',
				},
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('products_colours');
		await queryInterface.dropTable('orders_products');
		await queryInterface.dropTable('colours');
		await queryInterface.dropTable('orders');
		await queryInterface.dropTable('users');
		await queryInterface.dropTable('products');
		await queryInterface.dropTable('admin_users');
	},
};
