class UserDto {
    id
    email
    username
    firstName
    lastName
    clientID
    masterID
    phoneNumber
    profileType
    pictureID

    constructor(user) {
        if (user) {
            this.id = user.id
            this.email = user.email
            this.username = user.username
            this.firstName = user.firstName
            this.lastName = user.lastName
            this.clientID = user.clientID
            if (user.profileType === 'master') {
                this.masterID = user.masterID
            }
            this.phoneNumber = user.phoneNumber
            this.profileType = user.profileType
            this.pictureID = user.pictureID
        }
    }

    appendMaster(master) {
        this.master = {}
        this.master.shortBiography = master.shortBiography
        this.master.instagramProfile = master.instagramProfile
        this.master.available = master.available
        this.master.workingStartTime = master.workingStartTime
        this.master.workingEndTime = master.workingEndTime
        this.master.weekendDaysID = master.weekendDaysID
    }

    appendWeekendDays(weekendDays) {
        this.master.weekendDays = weekendDays
    }

}


module.exports = UserDto
