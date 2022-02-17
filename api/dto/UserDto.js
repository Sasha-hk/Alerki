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
}


module.exports = UserDto
