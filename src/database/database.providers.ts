import { Logger, Provider } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Sequelize } from 'sequelize-typescript'

import { databaseConfig } from 'src/config/database.config'
import { Providers } from 'src/consts'

import { Role } from 'src/roles/role.model'
import { Status } from 'src/statuses/status.model'
import { User } from 'src/users/user.model'
import { Token } from 'src/auth/token.model'

export const databaseProviders: Provider[] = [
	{
		provide: Providers.SEQUELIZE,
		inject: [databaseConfig.KEY],
		useFactory: async (config: ConfigType<typeof databaseConfig>) => {
			const logger = new Logger('Sequelize')
			const sequelize = new Sequelize({
				dialect: 'postgres',
				host: config.host,
				port: config.port,
				username: config.user,
				password: config.password,
				database: config.name,
				schema: config.schema,
				logging: message => logger.verbose(message)
			})
			sequelize.addModels([Status, User, Role, Token])
			await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${config.schema}"`)
			await sequelize.sync({ alter: config.sync })
			return sequelize
		}
	}
]
