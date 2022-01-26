const request = require('request')


class GoogleOAuth {
    async obtainToken(code) {
        return new Promise((resolve, reject) => {
            request.post(
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
                (error, response, body) => {
                    resolve(body);
                }
            )
        })
    }

    async getUserInfo(access_token) {
        return new Promise((resolve, reject) => {
            request.get(
                {
                    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
                    qs: {
                        access_token
                    },
                    json: true,
                },
                (error, responce, body) => {
                    resolve(body)
                }
            )
        })
    }
}

module.exports = new GoogleOAuth()
