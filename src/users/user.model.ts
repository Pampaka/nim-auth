import {
	Table,
	Column,
	Model,
	DataType,
	BelongsTo,
	ForeignKey,
	HasMany,
	Index
} from 'sequelize-typescript'

import { Token } from 'src/auth/token.model'
import { Role } from 'src/roles/role.model'
import { Status } from 'src/statuses/status.model'

@Table({
	modelName: 'user',
	comment: 'Пользователи'
})
export class User extends Model<User> {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataType.UUIDV4,
		comment: 'Идентификатор'
	})
	id: string

	@Index({ unique: true })
	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			notNull: { msg: 'Введите логин' }
		},
		comment: 'Логин'
	})
	login: string

	@Index({ unique: true })
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
		allowNull: false,
		comment: 'Роль'
	})
	roleId: string

	@BelongsTo(() => Role)
	role: Role

	@ForeignKey(() => Status)
	@Column({
		type: DataType.STRING,
		allowNull: false,
		comment: 'Статус'
	})
	statusId: string

	@BelongsTo(() => Status)
	status: Status

	@HasMany(() => Token, { onDelete: 'CASCADE', hooks: true })
	tokens: Token[]
}
