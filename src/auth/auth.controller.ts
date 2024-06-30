import { Body, Controller, Inject, Post, Req, Res } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Response, Request } from 'express'

import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { Public } from './decorators/public.decorator'
import { configuration } from './../config/configuration'

@Public()
@Controller('oauth')
export class AuthController {
	private REFRESH_TOKEN_NAME = 'refresh_token'

	constructor(
		private authService: AuthService,
		@Inject(configuration.KEY)
		private config: ConfigType<typeof configuration>
	) {}

	@Post('sign-in')
	async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = await this.authService.signIn(
			signInDto.login,
			signInDto.password,
			signInDto.rememberUser
		)

		if (refreshToken) {
			res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
				httpOnly: true,
				maxAge: this.config.jwt.refreshExpires
			})
		}

		return { accessToken }
	}

	@Post('refresh')
	async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = await this.authService.refresh(
			req.cookies[this.REFRESH_TOKEN_NAME]
		)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			maxAge: this.config.jwt.refreshExpires
		})

		return { accessToken }
	}
}
