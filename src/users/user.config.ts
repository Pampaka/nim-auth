import { registerAs } from '@nestjs/config'
import { Providers } from 'src/consts'

export const userConfig = registerAs(Providers.USER_CONFIG, () => ({
	email: 'admin@nim.ru',
	login: process.env.USER_LOGIN || 'admin',
	password: process.env.USER_PASS || 'admin'
}))
