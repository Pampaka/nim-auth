import { Provider } from '@nestjs/common'
import { Providers } from 'src/consts'
import { User } from './user.model'

export const usersProviders: Provider[] = [
	{
		provide: Providers.USER_REPOSITORY,
		useFactory: () => User
	}
]
