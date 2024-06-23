import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

import { TokensService } from 'src/tokens/tokens.service'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private tokensService: TokensService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request

		const token = this.extractTokenFromHeader(request)
		if (!token) {
			throw new UnauthorizedException('Не авторизован')
		}

		try {
			const payload = await this.tokensService.verifyAccessToken(token)
			request['user'] = payload
		} catch {
			throw new UnauthorizedException('Не авторизован')
		}

		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
