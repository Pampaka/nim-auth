import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
	modelName: 'status',
	timestamps: false,
	comment: 'Статусы'
})
export class Status extends Model {
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
