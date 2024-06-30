import { IsNotEmpty, IsOptional } from 'class-validator'

export class SignInDto {
	@IsNotEmpty({ message: 'Введите логин' })
	login: string

	@IsNotEmpty({ message: 'Введите пароль' })
	password: string

	@IsOptional()
	rememberUser: boolean
}
