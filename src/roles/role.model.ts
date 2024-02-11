import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
	modelName: 'role',
	timestamps: false,
	comment: 'Роли пользователей'
})
export class Role extends Model {
	@Column({
		type: DataType.STRING,
		primaryKey: true,
		allowNull: false
	})
	id: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		comment: 'Наименование'
	})
	name: string

	@Column({
		type: DataType.STRING,
		comment: 'Описание'
	})
	description: string
}
