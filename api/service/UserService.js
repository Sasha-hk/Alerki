const { UserModel } = require('../db/models')
const AuthError = require('../exception/AuthError')
const UserDto = require('../dto/UserDto')
const AuthService = require('./AuthService')
const bcrypt = require('bcrypt')


class UserService {
    async register(email, firstName, lastName, password, profileType) {
        // check if all data specefied
        if ([email, firstName, lastName, password, profileType].includes(undefined)) {
            console.log(123)
            throw AuthError.BadRequestError(['required data not specefied'])
        }

        // check if user with specefied email exists
        const checkUserExists = await UserModel.findOne({
            raw: true,
            where: {
                email
            }
        })
        
        if (checkUserExists) {
            throw AuthError.EmailExistsError()
        }
        
        // check if selected profile type
        if (profileType != 'client' && profileType != 'worker') {
            throw AuthError.BadRequestError()
        }
        
        const hashedPassword = bcrypt.hashSync(password, 1)
       
        // crete new user
        const newUser = await UserModel.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            profileType: profileType
        })
        
        // generate and save tokens
        const userData = new UserDto(newUser)
        const tokens = await AuthService.generateTokens({...userData})
        await AuthService.saveTokens(userData.id, tokens) 
        
        return {userData, ...tokens}
    }

    async login(email, password) {
        // check if user exists
        const loginUser = await UserModel.findOne({
            raw: true,
            where: {
                email,
            },
        })

        if (!loginUser) {
            throw AuthError.EmailNotExistsError()
        }

        // check password
        const passwordIsValid = bcrypt.compare(password, loginUser.password)

        if (!passwordIsValid) {
            throw AuthError.BadPasswordError()
        }

        // generate and save tokens
        const userData = new UserDto(loginUser)
        const tokens = await AuthService.generateTokens({...userData})
        await AuthService.saveTokens(userData.id, tokens)

        return {userData, ...tokens}
    }
}


module.exports = new UserService()
