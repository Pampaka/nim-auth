import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

import { TokensService } from 'src/tokens/tokens.service'
import { IS_PUBLIC_KEY } from './decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private tokensService: TokensService,
		private reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (isPublic) {
			return true
		}

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
