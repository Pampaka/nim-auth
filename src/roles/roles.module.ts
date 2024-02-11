import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from 'src/database/database.module'
import { rolesProviders } from './roles.providers'

@Module({
	imports: [DatabaseModule, ConfigModule],
	providers: [...rolesProviders],
	exports: [...rolesProviders]
})
export class RolesModule {}
