import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { authProviders } from './auth.providers'
import { UsersModule } from 'src/users/users.module'

@Module({
	imports: [DatabaseModule, UsersModule],
	controllers: [AuthController],
	providers: [AuthService, ...authProviders],
	exports: [AuthService, ...authProviders]
})
export class AuthModule {}
