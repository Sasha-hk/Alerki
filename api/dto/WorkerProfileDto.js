class WorkerProfileDto {
  id
  workingStartTime
  workingEndTime
  shortBiography
  instagramProfile
  

  constructor(workerProfile) {
    if (workerProfile) {
      this.id = workerProfile.id
      this.email = workerProfile.workingStartTime
      this.username = workerProfile.workingEndTime
      this.firstName = workerProfile.shortBiography
      this.lastName = workerProfile.instagramProfile
    }
  }
}


module.exports = WorkerProfileDto
