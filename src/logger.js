const winston = require('winston')

const { format } = winston
const { combine } = format

const msgConfiguration = ({ level, message, timestamp }) => {
	const date = new Date(timestamp)
	const time = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}.${date.getMilliseconds()}]`
	return `${time} <${level}> ${message}`
}

let logConfiguration
if (process.env.LOG_COLORIZE === 'true') {
	logConfiguration = {
		format: combine(
			winston.format.colorize(),
			winston.format.timestamp(),
			winston.format.prettyPrint(),
			winston.format.splat(),
			winston.format.printf(msgConfiguration)
		)
	}
} else {
	logConfiguration = {
		format: combine(
			winston.format.timestamp(),
			winston.format.prettyPrint(),
			winston.format.splat(),
			winston.format.printf(msgConfiguration)
		)
	}
}

const logger = winston.createLogger({
	...logConfiguration,
	transports: [
		new winston.transports.Console({
			level: process.env.LOG_LEVEL || 'info'
		})
	]
})

function processLog(module, ...args) {
	args = Array.prototype.slice.call(args)
	return [`[${module}]: ${args.join('; ')}`]
}

module.exports = {
	bindName: function (name) {
		return {
			debug: this.debug.bind(this, name),
			info: this.info.bind(this, name),
			http: this.http.bind(this, name),
			verbose: this.verbose.bind(this, name),
			warn: this.warn.bind(this, name),
			error: this.error.bind(this, name),
			silly: this.silly.bind(this)
		}
	},
	debug: function (module, ...args) {
		logger.debug.apply(logger, processLog(module, ...args))
	},
	info: function (module, ...args) {
		logger.info.apply(logger, processLog(module, ...args))
	},
	http: function (module, ...args) {
		logger.http.apply(logger, processLog(module, ...args))
	},
	verbose: function (module, ...args) {
		logger.verbose.apply(logger, processLog(module, ...args))
	},
	warn: function (module, ...args) {
		logger.warn.apply(logger, processLog(module, ...args))
	},
	error: function (module, ...args) {
		logger.error.apply(logger, processLog(module, ...args))
	},
	silly: logger.silly.bind(logger)
}
