import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from 'src/users/user.model'

@Table({
	modelName: 'token',
	comment: 'Токены',
	createdAt: false
})
export class Token extends Model<Token> {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataType.UUIDV4
	})
	id: string

	@Column({
		type: DataType.TEXT,
		allowNull: false,
		comment: 'Токен'
	})
	token: string

	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID,
		allowNull: false
	})
	userId: string

	@BelongsTo(() => User)
	user: User
}
