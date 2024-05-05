import { NestFactory } from '@nestjs/core'
import { ConfigType } from '@nestjs/config'
import { AppModule } from './app.module'
import { configuration } from './config/configuration'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true })
	const config = app.get<ConfigType<typeof configuration>>(configuration.KEY)
	app.useLogger(config.logger)
	await app.listen(config.port)
}
bootstrap()
