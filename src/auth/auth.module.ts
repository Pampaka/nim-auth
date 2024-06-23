import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'
import { UsersModule } from 'src/users/users.module'
import { TokensModule } from 'src/tokens/tokens.module'

@Module({
	imports: [UsersModule, TokensModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	],
	exports: []
})
export class AuthModule {}
