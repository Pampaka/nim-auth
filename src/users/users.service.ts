import { Inject, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ConfigType } from '@nestjs/config'
import { User } from './models/user.model'
import { hash } from 'src/helpers/hash'
import { Roles, Statuses } from 'src/consts'
import { configuration } from 'src/config/configuration'

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name)

	constructor(
		@InjectModel(User)
		private userModel: typeof User,
		@Inject(configuration.KEY)
		private config: ConfigType<typeof configuration>
	) {}

	async createDefaultUser() {
		try {
			const usersCount = await this.userModel.count()
			if (usersCount) return

			const { hash: password, salt } = hash(this.config.user.password)
			await this.userModel.create({
				login: this.config.user.login,
				email: this.config.user.email,
				password,
				salt,
				statusId: Statuses.ACTIVE,
				roleId: Roles.ADMIN
			})
		} catch (e) {
			this.logger.error(`Error create default user: ${e?.message}`)
		}
	}
}
