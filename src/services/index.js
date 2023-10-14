const logger = require('../logger').bindName('services')

const services = {}

async function init() {
	for (let [name, service] of Object.entries(services)) {
		if (service.init) {
			try {
				let res = service.init()
				if (res instanceof Promise) await res
			} catch (e) {
				logger.error(`Error init ${name}: ${e?.message}`)
				throw e
			}
		}

		logger.info(`${name} - success init`)
	}
}

module.exports = { init, services }
