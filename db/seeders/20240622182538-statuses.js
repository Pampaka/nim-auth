'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		await queryInterface.bulkInsert(
			{ tableName: 'statuses', schema: 'auth' },
			[
				{
					id: 'active',
					name: 'Активный'
				},
				{
					id: 'blocked',
					name: 'Заблокирован'
				},
				{
					id: 'deleted',
					name: 'Удален'
				}
			],
			{}
		)
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete(
			{ tableName: 'statuses', schema: 'auth' },
			{ id: ['active', 'blocked', 'deleted'] }
		)
	}
}
