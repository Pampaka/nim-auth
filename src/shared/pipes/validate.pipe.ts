import { Injectable, ValidationPipe } from '@nestjs/common'

@Injectable()
export class ValidatePipe extends ValidationPipe {
	constructor() {
		super({
			transform: true,
			transformOptions: {
				enableImplicitConversion: true
			}
		})
	}
}
