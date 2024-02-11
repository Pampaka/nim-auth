import { registerAs } from '@nestjs/config'
import { Providers } from 'src/consts'

export const appConfig = registerAs(Providers.APP_CONFIG, () => ({
	port: Number(process.env.APP_PORT) || 5000
}))
