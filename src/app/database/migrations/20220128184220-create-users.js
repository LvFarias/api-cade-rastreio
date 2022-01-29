'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
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
			email: {
				allowNull: false,
				type: Sequelize.STRING(45)
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING(45)
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
		await queryInterface.dropTable('Users');
	}
};
