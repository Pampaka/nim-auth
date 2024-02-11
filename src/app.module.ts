import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from './config/app.config'
import { databaseConfig } from './config/database.config'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig, databaseConfig],
			isGlobal: true
		}),
		DatabaseModule,
		UsersModule
	]
})
export class AppModule {}
