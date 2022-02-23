'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Orders', {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER.UNSIGNED
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING(45)
			},
			desc: {
				type: Sequelize.TEXT
			},
			delivery_id: {
				allowNull: false,
				type: Sequelize.INTEGER.UNSIGNED,
				references: { model: 'Deliveries', referencesKey: 'id' },
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER.UNSIGNED,
				references: { model: 'Users', referencesKey: 'id' },
			},
			values: {
				type: Sequelize.TEXT
			},
			status: {
				allowNull: false,
				type: Sequelize.STRING(45)
			},
			lastSync: {
				type: Sequelize.DATE
			},
			inSync: {
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			shippingDate: {
				type: Sequelize.DATE
			},
			service: {
				type: Sequelize.STRING(45)
			},
			origin: {
				type: Sequelize.STRING(45)
			},
			statusLog: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedAt: {
				type: Sequelize.DATE
			}
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Orders');
	}
};
