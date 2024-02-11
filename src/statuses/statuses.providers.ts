import { Provider } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { databaseConfig } from 'src/config/database.config'
import { Providers } from 'src/consts'
import { Status } from './status.model'
import statusesData from './statuses.data'

export const statusesProviders: Provider[] = [
	{
		provide: Providers.STATUS_REPOSITORY,
		inject: [databaseConfig.KEY, Providers.SEQUELIZE],
		useFactory: async (dbConfig: ConfigType<typeof databaseConfig>) => {
			if (dbConfig.initData) await Status.bulkCreate(statusesData, { ignoreDuplicates: true })
			return Status
		}
	}
]
