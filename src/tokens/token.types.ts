import { Roles } from 'src/consts'

export type TokenPayload = {
	id: string
	login: string
	roleId: Roles
}
