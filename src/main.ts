import { NestFactory } from '@nestjs/core'
import { ConfigType } from '@nestjs/config'
import { AppModule } from './app.module'
import { appConfig } from './config/app.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true })
	const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY)
	app.useLogger(config.logger)
	await app.listen(config.port)
}
bootstrap()
