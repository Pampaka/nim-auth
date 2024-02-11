export enum Providers {
	APP_CONFIG = 'appConfig',
	DB_CONFIG = 'databaseConfig',
	USER_CONFIG = 'userConfig',

	SEQUELIZE = 'sequelize',
	USER_REPOSITORY = 'userRepositiry',
	ROLE_REPOSITORY = 'roleRepositiry',
	STATUS_REPOSITORY = 'statusRepositiry'
}

export enum Statuses {
	ACTIVE = 'active',
	BLOCKED = 'blocked',
	DELETED = 'deleted'
}

export enum Roles {
	USER = 'user',
	ADMIN = 'admin'
}
