const NAME = 'app'
require('dotenv').config()
const express = require('express')
const { EventEmitter } = require('events')

const { logger } = require('./logger')
const config = require('./config')

const app = express()
const emitter = new EventEmitter()

exports.express = app
exports.emitter = emitter

async function start() {
	try {
		await require('./db').connect()
		await require('./services').init()

		const cookieParser = require('cookie-parser')
		app.use(cookieParser())
		const bodyParser = require('body-parser')
		app.use(bodyParser.json({ limit: '5mb' }))

		const cors = require('cors')
		app.use(cors({ credentials: true, origin: true }))
		app.use(express.json({ limit: '5mb' }))
		app.use(
			express.urlencoded({
				limit: '5mb',
				extended: true
			})
		)

		app.use('/api', require('./routes'))
		const { errorHandler } = require('./middlewares/errorHandler')
		app.use(errorHandler)

		app.listen(config.port, () => {
			logger.info(NAME, `Server started on port ${config.port}`)
		})
	} catch (e) {
		emitter.removeAllListeners()
		logger.error(NAME, e?.message)
		setTimeout(start, 15000)
	}
}

start()
