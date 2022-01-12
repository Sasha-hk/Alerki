const { UserModel, AuthUserModel } = require('../db/models')
const UserService = require('../service/UserService')
const getDeviceName = require('../utils/deviceName')


class AuthController {
    async register(req, res, next) {
        try {
            const {
                email,
                firstName,
                lastName,
                password,
                profileType
            } = req.body

            const deviceName = getDeviceName(req)

            const userData = await UserService.register(
                email, 
                firstName,
                lastName,
                password,
                profileType,
                deviceName,
            )

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})

            delete userData.refreshToken

            res.json(userData)
        }
        catch(e) {
            console.log(e)
            res.status(e.status || 500).json(e.errors)
        }
    }

    async login(req, res, next) {
        try {
            const {
                email,
                password,
            } = req.body

            const deviceName = getDeviceName(req)

            const userData = await UserService.login(email, password, deviceName)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})

            delete userData.refreshToken

            res.json(userData)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async logout(req, res, next) {
        try {
            const {
                accessToken,
                refreshToken
            } = req.cookies

            const deviceName = getDeviceName(req)

            UserService.logout(accessToken, refreshToken, deviceName)

            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')

            res.sendStatus(200)
        }
        catch(e) {
            console.log(e)
            res.status(e.status || 500).json(e.errors)
        }
    }

    async refresh(req, res, next) {
        try {

        }
        catch(e) {

        }
    }

    async withGoogle(req, res, next) {
        try {

        }
        catch(e) {

        }
    }

    async callbackGoogle(req, res, next) {
        try {

        }
        catch(e) {

        }
    }
}


module.exports = new AuthController()
