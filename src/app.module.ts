import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { configuration } from './config/configuration'
import { UsersModule } from './users/users.module'
import { StatusesModule } from './statuses/statuses.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			isGlobal: true
		}),
		SequelizeModule.forRootAsync({
			inject: [configuration.KEY],
			useFactory: (config: ConfigType<typeof configuration>) => {
				const logger = new Logger('Sequelize')
				return {
					dialect: 'postgres',
					host: config.db.host,
					port: config.db.port,
					username: config.db.user,
					password: config.db.password,
					database: config.db.name,
					schema: config.db.schema,
					sync: { alter: config.db.sync },
					autoLoadModels: true,
					synchronize: true,
					logging: message => logger.verbose(message)
				}
			}
		}),
		RolesModule,
		StatusesModule,
		UsersModule,
		AuthModule
	]
})
export class AppModule {}
