const { AuthUserModel, UserModel } = require('../db/models')
const jwt = require('jsonwebtoken')

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {accessToken, refreshToken}
    }

    async saveToken(userID, tokens) {
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
}


module.exports = new TokenService()
