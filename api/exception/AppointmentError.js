module.exports = class AppointmentError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        
        this.status = status
        this.errors = errors
    }

    static BadRequestError(errors=[]) {
        return new AppointmentError(400, 'Bad request', errors)
    }

    static NotFoundError() {
        return new AppointmentError(404, 'Appointment not found', ['appointment not found'])
    }
}