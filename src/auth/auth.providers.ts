import { Provider } from '@nestjs/common'
import { databaseConfig } from 'src/config/database.config'
import { Providers } from 'src/consts'
import { Token } from './token.model'

export const authProviders: Provider[] = [
	{
		provide: Providers.TOKEN_REPOSITORY,
		inject: [databaseConfig.KEY, Providers.SEQUELIZE, Providers.USER_REPOSITORY],
		useFactory: () => Token
	}
]
