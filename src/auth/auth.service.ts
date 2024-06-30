import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'

import { Statuses } from 'src/consts'
import { compareHash } from 'src/shared/utils/hash'
import { UserTokens } from 'src/tokens/token.types'
import { TokensService } from 'src/tokens/tokens.service'
import { User } from 'src/users/user.model'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private tokensService: TokensService
	) {}

	async signIn(login: string, password: string): Promise<UserTokens> {
		const user = await this.usersService.findByLogin(login)

		if (!user) {
			throw new UnauthorizedException('Неверный логин или пароль')
		}
		this.verifyUser(user)

		const isPasswordEqual = await compareHash(password, user.password, user.salt)
		if (!isPasswordEqual) {
			throw new UnauthorizedException('Неверный логин или пароль')
		}

		return this.tokensService.generateTokens({
			id: user.id,
			login: user.login,
			roleId: user.roleId
		})
	}

	verifyUser(user: User) {
		if (user.statusId === Statuses.BLOCKED) {
			throw new ForbiddenException('Пользователь заблокирован')
		}
		if (user.statusId === Statuses.DELETED) {
			throw new ForbiddenException('Пользователь удален')
		}
	}
}
