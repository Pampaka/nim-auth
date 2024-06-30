import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Statuses } from 'src/consts'
import { compareHash } from 'src/shared/utils/hash'
import { UserTokens } from 'src/tokens/token.types'
import { TokensService } from 'src/tokens/tokens.service'
import { User } from 'src/users/user.model'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User,
		private tokensService: TokensService
	) {}

	async signIn(login: string, password: string, rememberUser: boolean) {
		const user = await this.userModel.findOne({ where: { login } })

		if (!user) {
			throw new UnauthorizedException('Неверный логин или пароль')
		}
		this.verifyUser(user)

		const isPasswordEqual = await compareHash(password, user.password, user.salt)
		if (!isPasswordEqual) {
			throw new UnauthorizedException('Неверный логин или пароль')
		}

		return this._getTokens(user, !rememberUser)
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw new UnauthorizedException('Не авторизован')
		}

		const tokenData = await this.tokensService.verifyRefreshToken(refreshToken)
		if (!tokenData) {
			throw new UnauthorizedException('Не авторизован')
		}

		const tokenFromDb = await this.tokensService.findToken(refreshToken)
		if (!tokenFromDb) {
			throw new UnauthorizedException('Не авторизован')
		}

		const user = await this.userModel.findByPk(tokenData.id)
		if (!user) {
			throw new UnauthorizedException('Не авторизован')
		}
		this.verifyUser(user)

		return this._getTokens(user)
	}

	verifyUser(user: User) {
		if (user.statusId === Statuses.BLOCKED) {
			throw new ForbiddenException('Пользователь заблокирован')
		}
		if (user.statusId === Statuses.DELETED) {
			throw new ForbiddenException('Пользователь удален')
		}
	}

	private async _getTokens(user: User, noRefresh: boolean = false): Promise<UserTokens> {
		if (noRefresh) {
			const accessToken = await this.tokensService.generateAccessToken({
				id: user.id,
				login: user.login,
				roleId: user.roleId
			})

			return { accessToken }
		}

		const tokens = await this.tokensService.generateTokens({
			id: user.id,
			login: user.login,
			roleId: user.roleId
		})

		await this.tokensService.saveToken(tokens.refreshToken, user.id)

		return tokens
	}
}
