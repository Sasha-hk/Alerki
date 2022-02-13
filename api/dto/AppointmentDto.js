class AppointmentDto{
    id
    slug
    appointmentStartTime
    appointmentEndTime
    duration
    clientConfirm
    masterConfirm
    clientID
    workerID
    masterServiceID

    constructor({appointment}) {
        this.id = appointment.id,
        this.slug = appointment.slug
        this.appointmentStartTime = appointment.appointmentStartTime
        this.appointmentEndTime = appointment.appointmentEndTime
        this.duration = appointment.duration
        this.clientConfirm = appointment.clientConfirm
        this.masterConfirm = appointment.masterConfirm
        this.clientID = appointment.clientID
        this.workerID = appointment.workerId
        this.masterServiceID = appointment.masterServiceID
    }
}


module.exports = AppointmentDto
