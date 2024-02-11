import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { userConfig } from './user.config'
import { DatabaseModule } from 'src/database/database.module'
import { StatusesModule } from 'src/statuses/statuses.module'
import { RolesModule } from 'src/roles/roles.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { usersProviders } from './users.providers'

@Module({
	imports: [DatabaseModule, ConfigModule.forFeature(userConfig), StatusesModule, RolesModule],
	controllers: [UsersController],
	providers: [UsersService, ...usersProviders],
	exports: [UsersService, ...usersProviders]
})
export class UsersModule {}
