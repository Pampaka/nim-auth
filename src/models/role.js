const { MainModel } = require('./main.model')
const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

class Role extends MainModel {}

Role.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			unique: true,
			allowNull: false,
			comment: 'Идентификатор, STRING'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: 'Наименование, STRING'
		}
	},
	{
		modelName: 'role',
		comment: 'Роли пользователей',
		sequelize,
		timestamps: false
	}
)

module.exports = { Role }
