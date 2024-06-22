import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtModule } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'

import { Token } from './token.model'
import { TokensService } from './tokens.service'
import { configuration } from 'src/config/configuration'

@Module({
	imports: [
		SequelizeModule.forFeature([Token]),
		JwtModule.registerAsync({
			inject: [configuration.KEY],
			useFactory: (config: ConfigType<typeof configuration>) => {
				return {
					global: true,
					secret: config.jwt.accessSecret,
					signOptions: { expiresIn: config.jwt.accessExpires }
				}
			}
		})
	],
	providers: [TokensService],
	exports: [TokensService]
})
export class TokensModule {}
