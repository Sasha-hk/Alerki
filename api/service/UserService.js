const {UserModel, Sequelize} = require('../db/models')
const AuthService = require('./AuthService')
const UserPictureService = require('./UserPictureService')
const ProfileService = require('./ProfileService')
const AuthError = require('../exception/AuthError')
const UserDto = require('../dto/UserDto')
const checkType = require('../utils/validators/checkTypes')
const bcrypt = require('bcrypt')
const request = require('request')


class UserService {
    async findUserByEmail(email) {
        const checkUserExists = await UserModel.findOne({
            raw: true,
            where: {
                email
            }
        })

        return checkUserExists
    }

    async findUserByUsername({username}) {
        const foundUser = await UserModel.findOne({
            raw: true,
            where: {
                username,
            }
        })

        return foundUser
    }

    async findUserByID({id}) {
        checkType.hardNumber(Number(id), 'in findUserByID')
        const user = await UserModel.findOne({
            raw: true,
            where: {
                id,
            },
        })

        return user
    }

    async findByWorkerID({workerID}) {
        const foundUser = await UserModel.findOne({
            raw: true,
            where: {
                workerID,
            },
        })

        return foundUser
    }

    async checkEmailExists(email) {
        const checkUserExists = await this.findUserByEmail(email)

        if (checkUserExists) {
            throw AuthError.EmailExistsError()
        }

        return checkUserExists
    }

    async checkUsernameExists(username) {
        const checkUserExists = await this.findUserByUsername({username})

        if (checkUserExists) {
            throw AuthError.EmailExistsError()
        }

        return checkUserExists
    }

    async generateAndSaveTokens(user, deviceName) {
        const userData = {
            id: user.id,
            email: user.email,
            workerID: user.workerID,
            clientID: user.clientID,
        }
        const tokens = await AuthService.generateTokens({...userData})
        await AuthService.saveAuthData(userData.id, deviceName, tokens)
        
        return {userData, ...tokens}	
    }

    async register({
        email, 
        username,
        firstName,
        lastName,
        password, 
        profileType, 
        deviceName
    }) {    
        // check profile type
        if (profileType != 'client' && profileType != 'worker') {
            throw AuthError.BadRequestError()
        }

        // check if user with specefied email exists
        await this.checkEmailExists(email)
        await this.checkUsernameExists(username)

        const hashedPassword = bcrypt.hashSync(password, 1)

        // create profile
        let clientProfile = null
        let workerProfile = null
        if (profileType == 'client') {
            clientProfile = await ProfileService.createClientProfile()
        }
        else {
            clientProfile = await ProfileService.createClientProfile()
            workerProfile = await ProfileService.createWorkerProfile()
        }
        
        // crete new user
        const newUser = await UserModel.create({
            email,
            username,
            firstName,
            lastName,
            password: hashedPassword,
            profileType,
            clientID: clientProfile?.id || null,
            workerID: workerProfile?.id || null,
        })
 
        return await this.generateAndSaveTokens(newUser, deviceName)
    }

    async login({email, username, password, deviceName}) {
        // check if user exists
        const loginUser = await UserModel.findOne({
            raw: true,
            where: {
                [Sequelize.Op.or]: {
                    email: email || null,
                    username: username || null,
                }
            },
        })

        if (!loginUser) {
            throw AuthError.EmailNotExistsError()
        }

        // check password
        const passwordIsValid = await bcrypt.compare(password, loginUser.password)
        
        if (!passwordIsValid) {
            throw AuthError.BadPasswordError()
        }

        return await this.generateAndSaveTokens(loginUser, deviceName)
    }

    async logout({accessToken, refreshToken, deviceName}) {
        // get user id from accessToken or refreshToken
        const decodedToken = accessToken 
            ? await AuthService.verifyAccessToken(accessToken)
            : refreshToken 
                ? await AuthService.verifyRefreshToken(refreshToken) 
                : null

        decodedToken
            ? decodedToken.hasOwnProperty('id') 
                ? await AuthService.removeAuthData(decodedToken.id, deviceName) 
                : null
            : null 
    }

    async refresh({refreshToken, deviceName}) {
        // decode refreshToken
        const decodedToken = await AuthService.verifyRefreshToken(refreshToken)
        
        if (decodedToken) {
            // check if use with id from refreshToken exists
            const checkUser = await this.findUserByEmail(decodedToken.email)

            // if user exists generate new tokens
            if (checkUser) {
                return await this.generateAndSaveTokens(checkUser, deviceName)
            }
            else {
                throw AuthError.BadRequestError(['User not exists'])
            }

        }
        else {
            throw AuthError.BadRefreshToken()
        }
    }

    async savePhotoId(id, photoID) {
        const withPhoto = await UserModel.update({
                photoID,
            },
            {
                where: {
                    id
                }
            }
        )

        return withPhoto
    }

    async withGoogle({profileData, deviceName, googleToken}) {
        if (!profileData.email) {
            throw AuthError.BadRequestError(['code was invalid'])
        }
        const candedat = await this.findUserByEmail(profileData.email)

        if (candedat) {
            return await this.generateAndSaveTokens(candedat, deviceName)
        }
        else {
            const uploadAndSavePicture = async (pictureUrl) => {
                const picture = request(pictureUrl)
                const savedPicture = await UserPictureService.savePicture(picture, pictureUrl)
                return savedPicture.dataValues.id
            }

            const savedPicture = profileData.picture ? await uploadAndSavePicture(profileData.picture) : null

            // generate unique username from email
            let candedatUsername = profileData.email.split('@')[0]

            while (true) {
                const checkUsername = await this.findUserByUsername({username: candedatUsername})

                if (!checkUsername) {
                    break
                }

                candedatUsername += '_'
            }

            const newUser = await UserModel.create({
                email: profileData.email,
                username: candedatUsername,
                firstName: profileData.given_name,
                lastName: profileData.family_name,
                profileType: 'client',
                deviceName,
                pictureID: savedPicture?.id,
                googleAccessToken: googleToken.access_token,
                googleRefreshToken: googleToken.refresh_token,
                googleIdToken: googleToken.id_token,
            })

            return await this.generateAndSaveTokens(newUser, deviceName)
        }
    }

    async becomeWorker({id}) {
        const workerProfile = await ProfileService.createWorkerProfile()
        const update = await UserModel.update(
            {
                profileType: 'worker',
                workerID: workerProfile.id,
            },
            {
                returning: true,
                where: {
                    id,
                },
            }
        )

        return update[1][0]
    }

    async updateProfile({
        id,
        username,
        firstName,
        lastName,
    }) {
        const updatedUser = await UserModel.update(
            {
                username,
                firstName,
                lastName,
            }, 
            {
                returning: true,
                where: {
                    id,
                },
            }
        )

        return updatedUser[1][0]
    }
}


module.exports = new UserService()
