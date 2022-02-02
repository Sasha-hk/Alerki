const UserService = require('../service/UserService')
const getDeviceName = require('../utils/deviceName')
const GoogleOAuth = require('../oauth/GoogleOAuth')
const checkParams = require('../utils/validators/checkParams')


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
            const deviceName = getDeviceName(req)
            const {
                email,
                username,
                password,
            } = req.body

            checkParams.all([
                password
            ])

            checkParams.atLeastOne({
                email,
                username,
            })
            
            const userData = await UserService.login({email, username, password, deviceName})
            
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

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
        
            delete userData.refreshToken

            res.json(userData)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    // this only for developement - remove it later
    async withhGoogle(req, res, next) {
        try {
            const redirect_url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
                'scope=https://www.googleapis.com/auth/userinfo.profile&' +
                'access_type=offline&' +
                'include_granted_scopes=true&' +
                'response_type=code&' +
                'state=state_parameter_passthrough_value&' +
                'redirect_uri=http://localhost:3000/auth/callback/google&' +
                'client_id=' + process.env.GOOGLE_CLIENT_ID
            
            res.redirect(redirect_url)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async withGoogle(req, res, next) {
        try {
            const {code} = req.body

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
            
            delete userData.refreshToken

            res.json(userData)

        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }
}


module.exports = new AuthController()
