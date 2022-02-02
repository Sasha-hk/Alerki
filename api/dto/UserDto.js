class UserDto {
    id
    username
    email
    firstName
    lastName
    clientID

    constructor(user) {
        this.id = user.id
        this.email = user.email
        this.username = user.username
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.clientID = user.clientID
        this.puctureID = user.puctureID
        if (user.workerID) {
            this.workerID = user.workerID
        }
    }
}


module.exports = UserDto
