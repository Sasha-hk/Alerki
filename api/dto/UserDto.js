class UserDto {
    id
    email
    firstName
    lastName

    constructor(user) {
        this.id = user.id
        this.email = user.email
        this.firstName = user.firstName
        this.lastName = user.lastName
    }
}


module.exports = UserDto
