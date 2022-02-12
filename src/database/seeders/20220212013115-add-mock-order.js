'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const user = await queryInterface.rawSelect('Users', {
			where: { email: 'luan.vfarias@gmail.com' },
		}, ['id']);

		const delivery = await queryInterface.rawSelect('Deliveries', {
			where: { alias: 'correios' },
		}, ['id']);

		await queryInterface.bulkInsert('Orders', [{
			name: 'Carteira',
			desc: 'Descrição',
			delivery_id: delivery,
			user_id: user,
			values: JSON.stringify([{
				alias: 'cod',
				value: 'AB123456789BR',
			}]),
			status: 'Não Sincronizado',
			lastSync: new Date(),
			statusLog: JSON.stringify([{
				status: 'Não Sincronizado',
				date: new Date(),
			}]),
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	async down(queryInterface, Sequelize) {
		const user = await queryInterface.rawSelect('Users', {
			where: { email: 'luan.vfarias@gmail.com' },
		}, ['id']);

		const delivery = await queryInterface.rawSelect('Deliveries', {
			where: { alias: 'correios' },
		}, ['id']);

		await queryInterface.bulkDelete('Orders', {
			user_id: user,
			name: 'Carteira',
			delivery_id: delivery,
		}, {});
	}
};
