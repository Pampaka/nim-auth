import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from 'src/database/database.module'
import { statusesProviders } from './statuses.providers'

@Module({
	imports: [DatabaseModule, ConfigModule],
	providers: [...statusesProviders],
	exports: [...statusesProviders]
})
export class StatusesModule {}
