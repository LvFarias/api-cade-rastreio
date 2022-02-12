'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const user = await queryInterface.rawSelect('Users', {
			where: { email: 'luan.vfarias@gmail.com' },
		}, ['id']);

		await queryInterface.bulkInsert('UserConfigs', [{
			syncTime: 15,
			notifSms: true,
			notifPush: true,
			notifEmail: true,
			user_id: user,
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	async down(queryInterface, Sequelize) {
		const user = await queryInterface.rawSelect('Users', {
			where: { email: 'luan.vfarias@gmail.com' },
		}, ['id']);

		await queryInterface.bulkDelete('UserConfigs', { user_id: user }, {});
	}
};
