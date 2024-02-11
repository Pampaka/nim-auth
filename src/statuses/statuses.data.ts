import { Statuses } from 'src/consts'
import { TStatus } from './status.model'

export default [
	{
		id: Statuses.ACTIVE,
		name: 'Активный'
	},
	{
		id: Statuses.BLOCKED,
		name: 'Заблокирован'
	},
	{
		id: Statuses.DELETED,
		name: 'Удалён'
	}
] as TStatus[]
