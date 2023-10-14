const NAME = 'db'
const { Sequelize } = require('sequelize')
const config = require('./config')
const { logger } = require('./logger')
const data = require('./dbData')

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
	dialect: 'postgres',
	host: config.db.host,
	port: config.db.port,
	logging: logger.silly,
	schema: config.db.schema
})
exports.sequelize = sequelize
require('./models')

async function fillData() {
	const { models } = sequelize
	const transaction = await sequelize.transaction()

	try {
		for (let modelName in data) {
			const model = models[modelName]
			if (!model) throw new Error(`Model "${modelName}" not found`)
			await model.bulkCreate(data[modelName], { transaction, ignoreDuplicates: true })
		}
		await transaction.commit()
	} catch (e) {
		logger.error(NAME, 'Error fill data: ', e?.message)
		await transaction.rollback()
		throw e
	}
}

async function connect() {
	try {
		await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${config.db.schema}"`)
		await sequelize.sync({ alter: config.db.sync })
		if (config.db.init) await fillData()

		return { sequelize }
	} catch (e) {
		logger.error(NAME, `Error connect to database: ${e.message}`)
		throw e
	}
}

exports.connect = connect
