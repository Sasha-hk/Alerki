const { AuthUserModel, UserModel } = require('../db/models')
const jwt = require('jsonwebtoken')

class AuthService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {accessToken, refreshToken}
    }

    async saveTokens(userID, tokens) {
        // check if Auth data for the user already exists
        const checkExistsAuthData = await AuthUserModel.findOne({
            raw: true,
            where: {
                userID
            }
        })

        // if Auth data exists just update it
        if (checkExistsAuthData) {
            const updateExistsAuthData = await AuthUserModel.update({
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                },
                {
                    raw: true,
                    where: {
                        userID
                    }
                }
            )
        }

        // create new Auth data
        const newAuthData = await AuthUserModel.create({
            userID,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        })

        // make relationship with user
        await UserModel.update({
                authID: newAuthData.dataValues.id,
            },
            {
                where: {
                    id: userID,
                },
            }
        )
    }

    async removeTokens(userID) {
        await AuthUserModel.update({
                accessTokekn: '',
                refreshToken: '',
            },
            {
                where: {
                    userID,
                }
            }
        )

        return true
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
