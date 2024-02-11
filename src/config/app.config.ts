import { registerAs } from '@nestjs/config'

export const appConfig = registerAs('appConfig', () => ({
	port: Number(process.env.APP_PORT) || 5000
}))
