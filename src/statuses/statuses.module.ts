import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Status } from './status.model'

@Module({
	imports: [SequelizeModule.forFeature([Status])]
})
export class StatusesModule {}
