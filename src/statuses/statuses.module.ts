import { Module } from '@nestjs/common'
import { statusesProviders } from './statuses.providers'

@Module({
	providers: [...statusesProviders],
	exports: []
})
export class StatusesModule {}
