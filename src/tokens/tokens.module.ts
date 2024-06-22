import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Token } from './token.model'

@Module({
	imports: [SequelizeModule.forFeature([Token])]
})
export class TokensModule {}
