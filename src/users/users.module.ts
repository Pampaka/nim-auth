import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { usersProviders } from './users.providers'
import { User } from './user.model'

@Module({
	imports: [SequelizeModule.forFeature([User]), ConfigModule],
	controllers: [UsersController],
	providers: [UsersService, ...usersProviders],
	exports: [SequelizeModule]
})
export class UsersModule {}
