'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Deliveries', [{
			name: 'Correios',
			alias: 'correios',
			fields: JSON.stringify([{
				name: 'Codigo',
				alias: 'cod',
				type: 'text',
			}]),
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Deliveries', { alias: 'correios' }, {});
	}
};
