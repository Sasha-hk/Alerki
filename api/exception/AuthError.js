module.exports = class AuthError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new AuthError(401, 'User not authorized', ['user not authorized'])
    }

    static EmailExistsError() {
        return new AuthError(400, 'User with this email already exists', ['user with this email already exists'])
    }

    static EmailNotExistsError() {
        return new AuthError(400, 'User with this email not exists', ['user with this email not exists'])
    }

    static BadPasswordError() {
        return new AuthError(400, 'Wrong password', ['wrong password'])
    }
    
    static BadAccessToken() {
        return new AuthError(400, 'Invalid accessToken', ['invalid accessToken'])
    }
    
    static BadRefreshToken() {
        return new AuthError(400, 'Invalid refreshToken', ['invalid refreshToken'])
    }

    static BadRequestError(errors=[]) {
        return new AuthError(400, 'Bad request', errors)
    }

    static NotMasterError() {
        return new AuthError(400, 'Bad User is not a master', ['user not a master'])
    }
}