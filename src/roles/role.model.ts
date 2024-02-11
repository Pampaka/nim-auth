import { Table, Column, Model, DataType } from 'sequelize-typescript'

export type TRole = {
	id: string
	name: string
}

@Table({
	modelName: 'role',
	timestamps: false,
	comment: 'Роли пользователей'
})
export class Role extends Model<Role> {
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
}
