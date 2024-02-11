import { Provider } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { userConfig } from 'src/users/user.config'
import { Providers, Roles, Statuses } from 'src/consts'
import { hash } from 'src/helpers/hash'
import { User } from './user.model'

export const usersProviders: Provider[] = [
	{
		provide: Providers.USER_REPOSITORY,
		inject: [
			userConfig.KEY,
			Providers.SEQUELIZE,
			Providers.ROLE_REPOSITORY,
			Providers.STATUS_REPOSITORY
		],
		useFactory: async (user: ConfigType<typeof userConfig>) => {
			const usersCount = await User.count()
			if (usersCount) return User

			const { hash: password, salt } = hash(user.password)
			await User.create({
				login: user.login,
				email: user.email,
				password,
				salt,
				statusId: Statuses.ACTIVE,
				roleId: Roles.ADMIN
			})

			return User
		}
	}
]
