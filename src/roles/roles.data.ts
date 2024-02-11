import { Roles } from 'src/consts'
import { TRole } from './role.model'

export default [
	{
		id: Roles.USER,
		name: 'Пользователь'
	},
	{
		id: Roles.ADMIN,
		name: 'Администратор'
	}
] as TRole[]
