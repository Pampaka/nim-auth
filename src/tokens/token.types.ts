export type TokenPayload = {
	id: string
	login: string
	roleId: string
}

export type UserTokens = {
	accessToken: string
	refreshToken?: string
}
