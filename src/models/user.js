const { DataTypes } = require('sequelize')
const { MainModel } = require('./main.model')
const { Role } = require('./role')
const { sequelize } = require('../db')
const { Status } = require('./status')

class User extends MainModel {}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			unique: true,
			defaultValue: DataTypes.UUIDV4,
			comment: 'Идентификатор'
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: 'Логин',
			validate: {
				notNull: 'Логин обязателен',
				len: {
					args: [5, 30],
					msg: 'Длина от 5 до 30 символов'
				},
				is: {
					args: /[a-zA-Z_]+$/,
					msg: 'Только латиница'
				}
			}
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: 'Пароль'
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: 'Соль для пароля'
		},
		updateUserId: {
			type: DataTypes.UUID,
			comment: 'Последнее изменение',
			references: {
				model: User,
				key: 'id'
			}
		}
	},
	{
		modelName: 'user',
		comment: 'Пользователи',
		indexes: [{ unique: true, fields: ['login'] }],
		sequelize
	}
)

Role.hasMany(User)
User.belongsTo(Role, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', hooks: true })

Status.hasMany(User)
User.belongsTo(Status, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', hooks: true })

module.exports = { User }
