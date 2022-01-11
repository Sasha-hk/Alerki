const { UserModel, AuthUserModel } = require('../db/models')
const UserService = require('../service/UserService')

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

            const userData = await UserService.register(
                email, 
                firstName,
                lastName,
                password,
                profileType
            )

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})

            delete UserData.refreshToken

            res.json(UserData)
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

            const userData = await UserService.login(email, password)

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
            
        }
        catch(e) {

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
