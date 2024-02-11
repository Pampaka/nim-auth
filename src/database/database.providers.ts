import { Provider } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Sequelize } from 'sequelize-typescript'
import { databaseConfig } from 'src/config/database.config'
import { Providers } from 'src/consts'

export const databaseProviders: Provider[] = [
	{
		provide: Providers.SEQUELIZE,
		inject: [databaseConfig.KEY],
		useFactory: async (config: ConfigType<typeof databaseConfig>) => {
			const sequelize = new Sequelize({
				dialect: 'postgres',
				host: config.host,
				port: config.port,
				username: config.user,
				password: config.password,
				database: config.name,
				schema: config.schema
			})
			sequelize.addModels([])
			await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${config.schema}"`)
			await sequelize.sync({ alter: config.sync })
			return sequelize
		}
	}
]
