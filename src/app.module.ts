import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from './config/app.config'
import { databaseConfig } from './config/database.config'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { StatusesModule } from './statuses/statuses.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig, databaseConfig],
			isGlobal: true
		}),
		DatabaseModule,
		StatusesModule,
		RolesModule,
		UsersModule
	]
})
export class AppModule {}
