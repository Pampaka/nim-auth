function errorHandler(err, req, res) {
	if (err?.name === 'ResponseError') {
		return res.status(err.code).json({
			message: err.message,
			errors: err.errors
		})
	}
	return res.status(500).json({ message: 'Непредвиденная ошибка' })
}

module.exports = { errorHandler }
