import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { Public } from './decorators/public.decorator'

@Public()
@Controller('oauth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('sign-in')
	async signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto.login, signInDto.password)
	}
}
