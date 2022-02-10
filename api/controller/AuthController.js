const UserService = require('../service/UserService')
const getDeviceName = require('../utils/deviceName')
const GoogleOAuth = require('../oauth/GoogleOAuth')
const checkParams = require('../utils/validators/checkParams')
const UserDto = require('../dto/UserDto')


class AuthController {
    async register(req, res, next) {
        try {
            const deviceName = getDeviceName(req)
            const {
                email,
                username,
                firstName,
                lastName,
                password,
                profileType,
            } = req.body

            checkParams.all({
                email,
                username,
                password,
                profileType
            })
            
            const userData = await UserService.register({
                email,
                username,
                firstName,
                lastName,
                password,
                profileType,
                deviceName,
            })

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})
            res.cookie('authenticated', true, {maxAge: 30 * 24 * 60 * 60 * 1000})

            delete userData.refreshToken

            res.json(userData)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async login(req, res, next) {
        try {
            const deviceName = getDeviceName(req)
            const {
                email,
                username,
                password,
            } = req.body

            checkParams.all({
                password
            })

            checkParams.atLeastOne({
                email,
                username,
            })
            
            const userData = await UserService.login({email, username, password, deviceName})
            
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.cookie('authenticated', true, {maxAge: 30 * 24 * 60 * 60 * 1000})

            delete userData.refreshToken

            res.json(userData)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async logout(req, res, next) {
        try {
            const deviceName = getDeviceName(req)
            const {
                accessToken,
                refreshToken
            } = req.cookies

            checkParams.atLeastOne({
                accessToken,
                refreshToken
            })

            UserService.logout({accessToken, refreshToken, deviceName})

            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            res.clearCookie('authenticated')

            res.sendStatus(200)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors || e)
        }
    }

    async refresh(req, res, next) {
        try {
            const deviceName = getDeviceName(req)
            const {refreshToken} = req.cookies

            checkParams.all({refreshToken})

            const userData = await UserService.refresh({refreshToken, deviceName})
            
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.cookie('authenticated', true, {maxAge: 30 * 24 * 60 * 60 * 1000})
        
            delete userData.refreshToken

            res.json(userData)
        }
        catch(e) {
            res.clearCookie('refreshToken')
            res.clearCookie('authenticated')
            res.status(e.status || 500).json(e.errors)
        }
    }

    async withGoogle(req, res, next) {
        try {
            const {code} = req.query

            checkParams.all({code})
            const deviceName = getDeviceName(req)
            const googleToken = await GoogleOAuth.obtainToken(code)
            const profileData = await GoogleOAuth.getUserInfo(googleToken.access_token)
            const userData = await UserService.withGoogle({
                profileData,
                deviceName,
                googleToken
            })
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})
            res.cookie('authenticated', true, {maxAge: 30 * 24 * 60 * 60 * 1000})
            
            delete userData.refreshToken
            
            res.json(userData)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async user(req, res, next) {
        try {
            const user = await UserService.findUserByID({
                id: req.accessToken.id,
            })
            
            const userData = new UserDto(user)

            res.json(userData)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }
}


module.exports = new AuthController()
