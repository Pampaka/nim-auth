import { NestFactory } from '@nestjs/core'
import { ConfigType } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { configuration } from './config/configuration'
import { ValidatePipe } from './shared/pipes/validate.pipe'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true })

	const config = app.get<ConfigType<typeof configuration>>(configuration.KEY)
	app.useLogger(config.logger)

	app.useGlobalPipes(new ValidatePipe())
	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({ origin: true, credentials: true })

	await app.listen(config.port, () => {
		const logger = new Logger('App')
		logger.log(`Server started on port: ${config.port}`)
	})
}
bootstrap()
