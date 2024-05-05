import { Provider } from '@nestjs/common'
import { UsersService } from './users.service'

export const usersProviders: Provider[] = [
	{
		provide: 'usersInit',
		inject: [UsersService],
		useFactory: async (usersService: UsersService) => {
			return usersService.createDefaultUser()
		}
	}
]
