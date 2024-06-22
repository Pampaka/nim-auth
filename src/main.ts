import { NestFactory } from '@nestjs/core'
import { ConfigType } from '@nestjs/config'
import { AppModule } from './app.module'
import { configuration } from './config/configuration'
import { Logger } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true })

	const config = app.get<ConfigType<typeof configuration>>(configuration.KEY)
	app.useLogger(config.logger)

	await app.listen(config.port, () => {
		const logger = new Logger('App')
		logger.log(`Server started on port: ${config.port}`)
	})
}
bootstrap()
