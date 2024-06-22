import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'

import { User } from 'src/users/user.model'

@Table({
	modelName: 'token',
	comment: 'Токены',
	createdAt: false
})
export class Token extends Model<Token> {
	@Column({
		type: DataType.TEXT,
		allowNull: false,
		primaryKey: true,
		comment: 'Токен'
	})
	token: string

	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID,
		allowNull: false,
		comment: 'Пользователь'
	})
	userId: string

	@BelongsTo(() => User)
	user: User
}
