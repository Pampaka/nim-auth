const { Model } = require('sequelize')
const { ResponseError } = require('../errors/responseError')

class MainModel extends Model {
	static async destroyOne(params, options) {
		const res = await super.findOne(params)
		if (res) {
			await res.destroy(options)
		}
		return res
	}

	static async destroyMany(params, options = {}) {
		const res = await super.findAll(params)
		if (res?.length > 0) {
			if (!options?.transaction) {
				await this.sequelize.transaction(transaction => {
					return Promise.all(res.map(r => r.destroy({ transaction, ...options })))
				})
			} else {
				await Promise.all(res.map(r => r.destroy(options)))
			}
		}
		return res
	}

	async validate(options) {
		try {
			return await super.validate(options)
		} catch (e) {
			if (e.name !== 'SequelizeValidationError') throw e
			throw ResponseError.badRequest(
				'Ошибка валидации',
				e.errors.map(err => ({ param: err.path, msg: err.message }))
			)
		}
	}
}

module.exports = { MainModel }
