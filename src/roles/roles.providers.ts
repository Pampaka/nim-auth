import { Provider } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { databaseConfig } from 'src/config/database.config'
import { Providers } from 'src/consts'
import { Role } from './role.model'
import rolesData from './roles.data'

export const rolesProviders: Provider[] = [
	{
		provide: Providers.ROLE_REPOSITORY,
		inject: [databaseConfig.KEY, Providers.SEQUELIZE],
		useFactory: async (dbConfig: ConfigType<typeof databaseConfig>) => {
			if (dbConfig.initData) await Role.bulkCreate(rolesData, { ignoreDuplicates: true })
			return Role
		}
	}
]
