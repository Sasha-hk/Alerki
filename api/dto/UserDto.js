class UserDto {
    id
    email
    firstName
    lastName
    clientID

    constructor(user) {
        this.id = user.id
        this.email = user.email
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.clientID = user.clientID
        if (user.workerID) {
            this.workerID = user.workerID
        }
    }
}


module.exports = UserDto
