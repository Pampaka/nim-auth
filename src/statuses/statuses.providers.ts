import { Provider } from '@nestjs/common'
import { Providers } from 'src/consts'
import { Status } from './status.model'

export const statusesProviders: Provider[] = [
	{
		provide: Providers.STATUS_REPOSITORY,
		useFactory: () => Status
	}
]
