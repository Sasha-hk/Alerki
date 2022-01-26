class GetWorkersDto {
    id
    workerID
    username
    firstName
    lastName
    pictureID
    service

    constructor({worker, service}) {
        this.id = worker.id,
        this.workerID = worker.workerID,
        this.username = worker.username,
        this.firstName = worker.firstName,
        this.lastName = worker.lastName,
        this.pictureID = worker.pictureID

        this.service = {
            id: service.id,
            currency: service.currency,
            price: service.price,
            location: service.location,
            duration: service.duration,
            serviceID: service.serviceID,
        }
    }
}


module.exports = GetWorkersDto
