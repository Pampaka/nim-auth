import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Role } from 'src/roles/role.model'
import { Status } from 'src/statuses/status.model'

@Table({
	modelName: 'user',
	comment: 'Пользователи',
	indexes: [
		{ unique: true, fields: ['login'] },
		{ unique: true, fields: ['email'] }
	]
})
export class User extends Model {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataType.UUIDV4
	})
	id: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			notNull: { msg: 'Введите логин' }
		},
		comment: 'Логин'
	})
	login: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			notNull: { msg: 'Введите E-mail' },
			isEmail: { msg: 'Не верный формат E-mail' }
		},
		comment: 'Email'
	})
	email: string

	@Column({
		type: DataType.TEXT,
		allowNull: false,
		comment: 'Пароль'
	})
	password: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		comment: 'Соль для пароля'
	})
	salt: string

	@ForeignKey(() => Role)
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	roleId: number

	@BelongsTo(() => Role)
	role: Role

	@ForeignKey(() => Status)
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	statusId: number

	@BelongsTo(() => Status)
	status: Status
}
