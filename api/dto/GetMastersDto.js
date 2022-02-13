class GetMastersDto {
    id
    masterID
    username
    firstName
    lastName
    pictureID
    service

    constructor({master, service}) {
        this.id = master.id,
        this.masterID = master.masterID,
        this.username = master.username,
        this.firstName = master.firstName,
        this.lastName = master.lastName,
        this.pictureID = master.pictureID

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


module.exports = GetMastersDto
