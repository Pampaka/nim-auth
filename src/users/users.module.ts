import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { usersProviders } from './users.providers'
import { User } from './models/user.model'
import { Role } from './models/role.model'

@Module({
	imports: [SequelizeModule.forFeature([Role, User]), ConfigModule],
	controllers: [UsersController],
	providers: [UsersService, ...usersProviders],
	exports: [UsersService]
})
export class UsersModule {}
