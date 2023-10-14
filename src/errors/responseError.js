class ResponseError extends Error {
    constructor(message, code = 500, errors) {
        super(message);
        this.name = "ResponseError";
        this.code = code;
        this.errors = errors;
    }

    static badRequest(message, errors) {
        return new ResponseError(message, 400, errors);
    }

    static unAuthorizedError(message = "Не авторизован") {
        return new ResponseError(message, 401);
    }

    static forbidden(message = "Нет доступа") {
        return new ResponseError(message, 403);
    }

    static internal(message = "Непредвиденная ошибка") {
        return new ResponseError(message, 500);
    }
}

module.exports = { ResponseError };
