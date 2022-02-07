class ProfileDto {
    id
    username
    firstName
    lastName
    clientID
    profileType

    constructor(user) {
        this.id = user.id
        this.username = user.username
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.clientID = user.clientID
        this.profileType = user.profileType
        if (user.workerID) {
            this.workerID = user.workerID
        }
        this.pictureID = user.pictureID
    }

    addWorkerProfile(worker) {
        this.worker = {}
        this.worker.shortBiography = worker.shortBiography
        this.worker.instagramProfile = worker.instagramProfile
        this.worker.workingStartTime = worker.workingStartTime
        this.worker.workingEndTime = worker.workingEndTime
        this.worker.services = []
    }

    setWorkerServices(workerServices) {
        this.worker.services = workerServices
    }
}


module.exports = ProfileDto
