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
            if (user.workerID) {
                this.workerID = user.workerID
            }
            this.phoneNumber = user.phoneNumber
            this.profileType = user.profileType
            if (user.pictureID) {
                this.puctureID = user.puctureID
            }
        }
    }
}


module.exports = UserDto
