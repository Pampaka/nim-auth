const NAME = 'services'
const { logger } = require('../logger')

const services = {}

async function init() {
	for (let [name, service] of Object.entries(services)) {
		if (service.init) {
			try {
				let res = service.init()
				if (res instanceof Promise) await res
			} catch (e) {
				logger.error(NAME, `Error init ${name}: ${e?.message}`)
				throw e
			}
		}

		logger.info(NAME, `${name} - success init`)
	}
}

module.exports = { init, services }
