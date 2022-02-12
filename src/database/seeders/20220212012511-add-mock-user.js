'use strict';

const bcrypt = require('bcrypt');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Users', [{
			name: 'Luan',
			email: 'luan.vfarias@gmail.com',
			password: bcrypt.hashSync('Cade0.o', 10),
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', { email: 'luan.vfarias@gmail.com' }, {});
	}
};
