'use strict';

const mockUser = require('../seeders/20220212012511-add-mock-user');
const mockUserConfig = require('../seeders/20220212012820-add-mock-user-config');
const mockOrder = require('../seeders/20220212013115-add-mock-order');

module.exports = {
	async up(queryInterface, Sequelize) {
		await mockUser.up(queryInterface, Sequelize);
		await mockUserConfig.up(queryInterface, Sequelize);
		// await mockOrder.up(queryInterface, Sequelize);
	},

	async down(queryInterface, Sequelize) {
		// await mockOrder.down(queryInterface, Sequelize);
		await mockUserConfig.down(queryInterface, Sequelize);
		await mockUser.down(queryInterface, Sequelize);
	}
};
