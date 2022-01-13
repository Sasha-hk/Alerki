const { AuthUserModel, UserModel } = require('../db/models')
const jwt = require('jsonwebtoken')

class AuthService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {accessToken, refreshToken}
    }

    async saveAuthData(userID, deviceName, tokens) {
        // check if Auth data for the user already exists
        const checkExistsAuthData = await AuthUserModel.findOne({
            raw: true,
            where: {
                userID,
                deviceName,
            }
        })

        // if Auth data exists just update it
        if (checkExistsAuthData) {
            // update exists Auth data
            await AuthUserModel.update({
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken
                },
                {
                    raw: true,
                    where: {
                        userID,
                        deviceName,
                    }
                }
            )
        }
        else {    
            // create new Auth data
            await AuthUserModel.create({
                userID,
                deviceName,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            })
        }
    }

    async removeAuthData(userID, deviceName) {
        await AuthUserModel.destroy({
                where: {
                    userID,
                    deviceName
                }
            }
        )
    }

    async verifyAccessToken(accessToken) {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

        return decoded
    }

    async verifyRefreshToken(accessRefresh) {
        const decoded = jwt.verify(accessRefresh, process.env.JWT_REFRESH_SECRET)

        return decoded
    }
}


module.exports = new AuthService()
