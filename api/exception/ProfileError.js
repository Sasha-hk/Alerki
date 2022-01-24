module.exports = class APIError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        
        this.status = status
        this.errors = errors
    }
    
    static RequiredAllTimeError() {
        return new APIError(400, 'Required start and end working time', ['required start and end working time'])
    }

    static NotFoundError(errors = []) {
        return new APIError(404, 'Not found', errors)
    }
}