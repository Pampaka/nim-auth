'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		await queryInterface.bulkInsert(
			{ tableName: 'roles', schema: 'auth' },
			[
				{
					id: 'admin',
					name: 'Админ'
				},
				{
					id: 'user',
					name: 'Пользователь'
				}
			],
			{}
		)
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete(
			{ tableName: 'roles', schema: 'auth' },
			{ id: ['admin', 'user'] }
		)
	}
}
