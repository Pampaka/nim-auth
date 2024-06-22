import { LogLevel } from '@nestjs/common'
import { registerAs } from '@nestjs/config'
import { Providers } from 'src/consts'

export const configuration = registerAs(Providers.APP_CONFIG, () => {
	let logs: LogLevel[] = []
	switch (process.env.LOG_LEVEL?.toLocaleLowerCase()) {
		case 'error':
			logs = ['fatal', 'log', 'error']
			break
		case 'warn':
			logs = ['fatal', 'log', 'error', 'warn']
			break
		case 'debug':
			logs = ['fatal', 'log', 'error', 'warn', 'debug']
			break
		case 'verbose':
			logs = ['fatal', 'log', 'error', 'warn', 'debug', 'verbose']
			break
		default:
			logs = ['fatal', 'log']
	}

	return {
		port: Number(process.env.APP_PORT) || 5000,
		logger: logs,
		user: {
			email: 'admin@nim.ru',
			login: process.env.USER_LOGIN || 'admin',
			password: process.env.USER_PASS || 'admin'
		},
		db: {
			host: process.env.DB_HOST || 'nim_pg',
			port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
			user: process.env.DB_USER || 'nim-user',
			password: process.env.DB_PASSWORD || 'password',
			name: process.env.DB_NAME || 'nim-auth',
			sync: process.env.NODE_ENV !== 'production' && process.env.DB_SYNC === 'true',
			schema: 'auth'
		},
		jwt: {
			accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret',
			refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
			accessExpires: process.env.JWT_ACCESS_EXPIRES
				? Number(process.env.JWT_ACCESS_EXPIRES)
				: 15 * 60 * 1000,
			refreshExpires: process.env.JWT_REFRESH_EXPIRES
				? Number(process.env.JWT_REFRESH_EXPIRES)
				: 30 * 24 * 60 * 60 * 1000
		}
	}
})
