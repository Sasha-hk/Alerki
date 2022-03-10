class MasterServiceDto {
  constructor(masterServices) {
    if (Array.isArray(masterServices)) {
      this.services = []
      for (const service of masterServices) {
        this.services.push(this.parseService(service))
      }
    }
    else if (typeof masterServices === 'object' && masterServices !== undefined) {
      this.id = masterServices.id
      this.name= masterServices.name
      this.currency = masterServices.currency
      this.price = masterServices.price
      this.location = masterServices.location
      this.duration = masterServices.duration
      this.masterID = masterServices.masterID
      this.serviceID = masterServices.serviceID
    }
  }

  parseService(service) {
    const preparedService = {
      id: service.id,
      name: service.name,
      currency: service.currency,
      price: service.price,
      location: service.location,
      duration: service.duration,
      masterID: service.masterID,
      serviceID: service.serviceID,
    }

    return preparedService
  }
}


module.exports = MasterServiceDto
