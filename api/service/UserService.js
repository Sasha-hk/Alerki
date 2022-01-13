const { UserModel } = require('../db/models')
const AuthError = require('../exception/AuthError')
const UserDto = require('../dto/UserDto')
const AuthService = require('./AuthService')
const bcrypt = require('bcrypt')


class UserService {
    async register(email, firstName, lastName, password, profileType, deviceName) {
        // check if all data specefied
        console.log(email, firstName, lastName, profileType)
        if ([email, firstName, lastName, profileType].includes(undefined)) {
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

        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 1)
        } 
       
        // crete new user
        const newUser = await UserModel.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password ? hashedPassword : null,
            profileType: profileType,
        })
        
        // generate and save tokens
        const userData = new UserDto(newUser)
        const tokens = await AuthService.generateTokens({...userData})
        await AuthService.saveTokens(userData.id, deviceName, tokens) 
        
        return {userData, ...tokens}
    }

    async login(email, password, deviceName) {
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
        await AuthService.saveTokens(userData.id, deviceName, tokens)

        return {userData, ...tokens}
    }

    async logout(accessToken, refreshToken, deviceName) {
        // get user id from accessToken or refreshToken
        const decodedToken = accessToken 
            ? await AuthService.verifyAccessToken(accessToken)
            : refreshToken 
                ? await AuthService.verifyRefreshToken(refreshToken) 
                : null

        decodedToken
            ? decodedToken.hasOwnProperty('id') 
                ? await AuthService.removeTokens(decodedToken.id, deviceName) 
                : null
            : null 
    }

    async refresh(refreshToken, deviceName) {
        // decode refreshToken
        const decodedToken = await AuthService.verifyRefreshToken(refreshToken)

        if (decodedToken) { 
            // check if use with id from refreshToken exists
            const checkUser = await UserModel.findOne({
                raw: true,
                where: {
                    email: decodedToken.email,
                },
            })

            // if user exists generate new tokens
            if (checkUser) {
                // generate and save tokens
                const userData = new UserDto(checkUser)
                const tokens = await AuthService.generateTokens({...userData})
                await AuthService.saveTokens(userData.id, deviceName, tokens)
    
                return {userData, ...tokens} 
            }
            else {
                throw AuthError.BadRequestError(['User not exists'])
            }

        }
        else {
            throw AuthError.BadRefreshToken()
        }
    }
}


module.exports = new UserService()
