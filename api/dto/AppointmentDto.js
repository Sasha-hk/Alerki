class AppointmentDto{
    id
    slug
    appointmentStartTime
    appointmentEndTime
    duration
    clientConfirm
    workerConfirm
    clientID
    workerID
    workerServiceID

    constructor({appointment}) {
        this.id = appointment.id,
        this.slug = appointment.slug
        this.appointmentStartTime = appointment.appointmentStartTime
        this.appointmentEndTime = appointment.appointmentEndTime
        this.duration = appointment.duration
        this.clientConfirm = appointment.clientConfirm
        this.workerConfirm = appointment.workerConfirm
        this.clientID = appointment.clientID
        this.workerID = appointment.workerId
        this.workerServiceID = appointment.workerServiceID
    }
}


module.exports = AppointmentDto
