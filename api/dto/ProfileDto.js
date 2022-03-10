const MasterServiceDto = require('./MasterServiceDto')


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
    if (user.masterID) {
      this.masterID = user.masterID
    }
    this.pictureID = user.pictureID
  }

  addMasterProfile(master) {
    this.master = {}
    this.master.shortBiography = master.shortBiography
    this.master.instagramProfile = master.instagramProfile
    this.master.workingStartTime = master.workingStartTime
    this.master.workingEndTime = master.workingEndTime
    this.master.services = []
  }

  setMasterServices(masterServices) {
    this.master.services = new MasterServiceDto(masterServices).services
  }
}


module.exports = ProfileDto
