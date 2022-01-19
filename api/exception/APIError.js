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

    static NotFoundError() {
        return new APIError(404, 'Resource not found', ['not found'])
    }
}