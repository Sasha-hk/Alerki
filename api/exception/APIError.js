module.exports = class APIError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        
        this.status = status
        this.errors = errors
    }

    static BadRequestError(errors=[]) {
        return new APIError(400, 'Bad request', errors)
    }

    static NotFoundError(errors = []) {
        return new APIError(404, 'Not found', errors)
    }

    static IncorrectDateError() {
        return new APIError(400, 'Date is incorrect', ['incorrect date'])
    }

    static ServerError() {
        return new APIError(500, 'Server error', [])

    }
}