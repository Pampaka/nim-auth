const { MainModel } = require('./main.model')
const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

class Status extends MainModel {}

Status.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
			comment: 'Идентификатор'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: 'Наименование'
		}
	},
	{
		modelName: 'status',
		comment: 'Статусы записей',
		sequelize,
		timestamps: false
	}
)

module.exports = { Status }
