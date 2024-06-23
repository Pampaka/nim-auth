import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { Token } from './token.model'
import { TokenPayload, UserTokens } from './token.types'
import { configuration } from 'src/config/configuration'

@Injectable()
export class TokensService {
	constructor(
		@InjectModel(Token)
		private tokenModel: typeof Token,
		private jwtService: JwtService,
		@Inject(configuration.KEY)
		private config: ConfigType<typeof configuration>
	) {}

	async generateTokens(payload: TokenPayload): Promise<UserTokens> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload),
			this.jwtService.signAsync(payload, {
				secret: this.config.jwt.refreshSecret,
				expiresIn: this.config.jwt.refreshExpires
			})
		])

		return {
			accessToken,
			refreshToken
		}
	}

	async saveToken(token: string, userId: string): Promise<void> {
		const tokenFromDb = await this.tokenModel.findByPk(token)

		if (tokenFromDb) {
			tokenFromDb.token = token
			await tokenFromDb.save()
		} else {
			await this.tokenModel.create({ token, userId })
		}
	}

	async removeToken(token: string): Promise<boolean> {
		const result = await this.tokenModel.destroy({ where: { token } })
		return !!result
	}

	async verifyAccessToken(token: string) {
		return this.jwtService.verifyAsync(token)
	}

	async verifyRefreshToken(token: string) {
		return this.jwtService.verifyAsync(token, {
			secret: this.config.jwt.refreshSecret
		})
	}
}
