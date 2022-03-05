class MasterProfileDto {
  id
  workingStartTime
  workingEndTime
  shortBiography
  instagramProfile
  

  constructor(masterProfile) {
    if (masterProfile) {
      this.id = masterProfile.id
      this.workingStartTime = masterProfile.workingStartTime
      this.workingEndTime = masterProfile.workingEndTime
      this.shortBiography = masterProfile.shortBiography
      this.instagramProfile = masterProfile.instagramProfile
    }
  }
}


module.exports = MasterProfileDto
