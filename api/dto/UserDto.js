class UserDto {
    id
    email
    username
    firstName
    lastName
    clientID
    workerID
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
            if (user.profileType === 'worker') {
                this.workerID = user.workerID
            }
            this.phoneNumber = user.phoneNumber
            this.profileType = user.profileType
            this.puctureID = user.pictureID
        }
    }
}


module.exports = UserDto
