import { registerAs } from '@nestjs/config'

export const databaseConfig = registerAs('databaseConfig', () => ({
	host: process.env.DB_HOST || 'nim_pg',
	port: Number(process.env.DB_PORT) || 5432,
	user: process.env.DB_USER || 'nim-user',
	password: process.env.DB_PASSWORD || 'password',
	name: process.env.DB_NAME || 'nim-auth',
	sync: process.env.NODE_ENV !== 'production',
	schema: 'auth'
}))
