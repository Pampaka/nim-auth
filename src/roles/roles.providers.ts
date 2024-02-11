import { Provider } from '@nestjs/common'
import { Providers } from 'src/consts'
import { Role } from './role.model'

export const rolesProviders: Provider[] = [
	{
		provide: Providers.ROLE_REPOSITORY,
		useFactory: () => Role
	}
]
