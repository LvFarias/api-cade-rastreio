'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('UserConfigs', {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER.UNSIGNED
			},
			syncTime: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			notifSms: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			notifPush: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			notifEmail: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER.UNSIGNED,
				references: { model: 'Users', referencesKey: 'id' },
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
		await queryInterface.dropTable('UserConfigs');
	}
};
