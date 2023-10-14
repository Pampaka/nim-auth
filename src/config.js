const NAME = 'config'
const { logger } = require('./logger')
const fs = require('fs')
const nodeEnv = process.env.NODE_ENV || 'production'

const vars = {
	APP_PORT: 5000,
	DB_HOST: 'nim_pg',
	DB_PORT: 5432,
	DB_NAME: 'nim-auth',
	DB_USER: 'nim-user',
	DB_PASSWORD: 'password',
	DB_INIT: false,
	DB_SYNC: false,
	USER_LOGIN: 'admin',
	USER_PASSWORD: 'admin',
	JWT_ACCESS_SECRET: 'ACCESS',
	JWT_REFRESH_SECRET: 'REFRESH',
	JWT_EXPIRES_TIME: 1800000
}

function mkConfig(vars) {
	return {
		port: vars.APP_PORT,
		user: {
			login: vars.USER_LOGIN,
			password: vars.USER_PASSWORD
		},
		db: {
			host: vars.DB_HOST,
			port: vars.DB_PORT,
			name: vars.DB_NAME,
			user: vars.DB_USER,
			password: vars.DB_PASSWORD,
			sync: vars.DB_SYNC,
			init: vars.DB_INIT,
			schema: 'auth'
		},
		jwt: {
			accessSecret: vars.JWT_ACCESS_SECRET,
			refreshSecret: vars.JWT_REFRESH_SECRET,
			expiresTime: vars.JWT_EXPIRES_TIME,
			refreshExpiresTime: 30 * 24 * 60 * 60 * 1000
		}
	}
}

function getVar(value) {
	if (typeof value !== 'boolean' && value !== null && value !== '' && !isNaN(Number(value)))
		return Number(value)
	if (['true', 'false'].includes(value)) return value === 'true'
	return value
}

function getArgvConfig() {
	const argvConfig = {}
	process.argv.map(val => {
		const arr = /([A-Z_0-9]*)=(.*)/.exec(val)
		if (arr && arr.length === 3 && vars.hasOwnProperty(arr[1])) {
			argvConfig[arr[1]] = getVar(arr[2])
		}
	})

	return argvConfig
}

function getEnvConfig() {
	const envConfig = {}
	for (const key in vars) {
		if (process.env[key]) envConfig[key] = getVar(process.env[key])
	}

	return envConfig
}

function getInitialConfig() {
	let config = {}
	try {
		const confPath = process.cwd() + '/src/configs/' + nodeEnv + '.js'
		if (!fs.existsSync(confPath)) return config
		config = require(process.cwd() + '/src/configs/' + nodeEnv + '.js')
	} catch (e) {
		logger.warn(NAME, `Error get config in "/src/configs/${nodeEnv}.js": ${e.message}`)
	}

	return config
}

function extendConfig() {
	let varsConfig = {}

	try {
		varsConfig = {
			...vars,
			...getInitialConfig(),
			...getEnvConfig(),
			...getArgvConfig()
		}
	} catch (e) {
		logger.error(NAME, 'Error on loading config: ' + e.message)
	}

	const config = mkConfig(varsConfig)
	config.env = nodeEnv

	return config
}

const config = extendConfig()
logger.info(NAME, `Starting with configuration ${config.env}`)
logger.debug(NAME, JSON.stringify(config))

module.exports = config
