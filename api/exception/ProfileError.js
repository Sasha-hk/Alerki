module.exports = class ProfileError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        
        this.status = status
        this.errors = errors
    }
    
    static RequiredAllTimeError() {
        return new ProfileError(400, 'Required start and end working time', ['required start and end working time'])
    }

    static NotFoundError(errors = []) {
        return new ProfileError(404, 'Not found', errors)
    }

    static UsernameExistsError() {
        return new ProfileError(
            400,
            'User with this username already exists',
            {username: 'user with this username already exists'}
        )
    }
}