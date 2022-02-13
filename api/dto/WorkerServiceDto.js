class WorkerServiceDto {
    constructor(workerServices) {
        if (Array.isArray(workerServices)) {
            this.services = []
            for (const service of workerServices) {
                this.services.push(this.parseService(service))
            }
        }
        else if (typeof workerServices === 'object' && workerServices !== undefined) {
            this.id = workerServices.id
            this.currency = workerServices.currency
            this.price = workerServices.price
            this.location = workerServices.location
            this.duration = workerServices.duration
            this.workerID = workerServices.workerID
            this.serviceID = workerServices.serviceID
        }
    }

    parseService(service) {
        const preparedService = {
            id: service.id,
            currency: service.currency,
            price: service.price,
            location: service.location,
            duration: service.duration,
            workerID: service.workerID,
            serviceID: service.serviceID,
        }

        return preparedService
    }
}


module.exports = WorkerServiceDto
