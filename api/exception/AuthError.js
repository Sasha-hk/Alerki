module.exports = class AuthError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new AuthError(401, 'User not authorized')
    }

    static EmailExistsError() {
        return new AuthError(400, 'User with this email already exists', ['user with this email already exists'])
    }

    static EmailNotExistsError() {
        return new AuthError(400, 'User with this email not exists')
    }

    static BadPasswordError() {
        return new AuthError(400, 'Wrong password')
    }

    static BadRequestError(errors=[]) {
        return new AuthError(400, 'Bad request', errors)
    }
}