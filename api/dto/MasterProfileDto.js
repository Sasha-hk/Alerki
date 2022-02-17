class MasterProfileDto {
  id
  workingStartTime
  workingEndTime
  shortBiography
  instagramProfile
  

  constructor(masterProfile) {
    if (masterProfile) {
      this.id = masterProfile.id
      this.email = masterProfile.workingStartTime
      this.username = masterProfile.workingEndTime
      this.firstName = masterProfile.shortBiography
      this.lastName = masterProfile.instagramProfile
    }
  }
}


module.exports = MasterProfileDto
