const { DataTypes } = require('sequelize')
const { MainModel } = require('./main.model')
const { sequelize } = require('../db')
const { User } = require('./user')

class Token extends MainModel {}

Token.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true,
			comment: 'Идентификатор'
		},
		refreshToken: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: 'Refresh-token'
		}
	},
	{
		modelName: 'token',
		comment: 'Jwt-токены пользователей',
		sequelize,
		timestamps: false
	}
)

User.hasMany(Token, { onDelete: 'cascade', hooks: true })
Token.belongsTo(User, { foreignKey: { allowNull: false } })

module.exports = { Token }
