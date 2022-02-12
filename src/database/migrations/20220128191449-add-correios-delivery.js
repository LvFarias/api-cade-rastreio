'use strict';

const seeder = require('../seeders/20220128191038-add-correios-delivery');

module.exports = {
	async up(queryInterface, Sequelize) {
		await seeder.up(queryInterface, Sequelize);
	},

	async down(queryInterface, Sequelize) {
		await seeder.down(queryInterface, Sequelize);
	}
};
