import { LogLevel } from '@nestjs/common'
import { registerAs } from '@nestjs/config'
import { Providers } from 'src/consts'

export const appConfig = registerAs(Providers.APP_CONFIG, () => {
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
		logger: logs
	}
})
