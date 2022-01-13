const { UserModel, AuthUserModel } = require('../db/models')
const UserService = require('../service/UserService')
const getDeviceName = require('../utils/deviceName')
const request = require('request')


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
            res.status(e.status || 500).json(e.errors)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const deviceName = getDeviceName(req)
            const userData = await UserService.refresh(refreshToken, deviceName)

            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            
            delete userData.refreshToken

            res.json(userData)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async withGoogle(req, res, next) {
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

    async callbackGoogle(req, res, next) {
        try {
            const {code} = req.query

            const deviceName = getDeviceName(req)

            if (code) {
                const google_response = await request.post(
                    {
                        url: 'https://www.googleapis.com/oauth2/v4/token',
                        form: {
                            code: code,
                            client_id: process.env.GOOGLE_CLIENT_ID,
                            client_secret: process.env.GOOGLE_CLIENT_SECRET,
                            redirect_uri: 'http://localhost:3000/auth/callback/google',
                            grant_type: 'authorization_code',
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        json: true,
                    },
                    (err, httpResponse, token) => {
                        const {
                            access_token,
                            refresh_token,
                            id_token,
                        } = token             

                        const user = request.get(
                            {
                                url: 'https://www.googleapis.com/oauth2/v2/userinfo',
                                qs: {
                                    access_token
                                },
                                json: true,
                            },
                            async (err, httpResponse, profileData) => {
                                if (profileData.picture) {
                                    console.log('save into database the picture')
                                }
                                console.log(profileData.email)
                                const userData = await UserService.register(
                                    profileData.email,
                                    profileData.given_name,
                                    profileData.family_name,
                                    null,
                                    'client',
                                    deviceName,
                                )

                                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                                res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 60 * 1000})

                                delete userData.refreshToken

                                res.json(userData)
                            }
                        )
                    }
                )
            }
        }
        catch(e) {
            console.log(e)
            res.status(e.status || 500).json(e.errors)
        }
    }
}


module.exports = new AuthController()
