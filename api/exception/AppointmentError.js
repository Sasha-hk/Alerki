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

    static BusyTimeError() {
        return new AppointmentError(400, 'This appointment time is busy', ['start or end appointment time is busy'])
    }

    static ForHimselfError() {
        return new AppointmentError(400, 'Can not create appointment for himself', ['you can not create appointment for himself'])
    }

    static MasterNotFoundError() {
        return new AppointmentError(400, 'Master not found', ['master with specefied id not found'])
    }

    static ServiceNotFoundError() {
        return new AppointmentError(400, 'Service not found', ['service with specefied id not found'])
    }

    static AppointmentTimeInWeekendDayError() {
        return new AppointmentError(400, 'Appointment start time is in master weekend day ', ['appointmentStartTime is in master weekend day'])
    }

    static OutOfWorkingTimeError() {
        return new AppointmentError(400, 'Appointment time is out of master working time', ['appointment time is out of master working time'])
    }

    static WeekendDayError() {
        return new AppointmentError(400, 'You cannot make an appointment for a weekend', ['cannot make an appointment for a weekend'])
    }

    static NotBelongsToUserError() {
        return new AppointmentError(400, 'Appointment not belongs to user', ['appointment not belongs to you'])
    }
}