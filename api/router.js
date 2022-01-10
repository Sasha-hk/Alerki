const Router = require('express')
const request = require('request')

const router = new Router()
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">sign in with Google</a>') 
})

router.get('/auth/google', (req, res) => {
    const redirect_url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
        'scope=https://www.googleapis.com/auth/userinfo.email&' +
        'access_type=offline&' +
        'include_granted_scopes=true&' +
        'response_type=code&' +
        'state=state_parameter_passthrough_value&' +
        'redirect_uri=http://localhost:3000/callback/google&' +
        'client_id=' + CLIENT_ID
    res.redirect(redirect_url)
})

router.get('/callback/google', async (req, res) => {
    const code = req.query.code

    const google_response = request.post(
        {
            url: 'https://www.googleapis.com/oauth2/v4/token',
            form: {
                code: code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: 'http://localhost:3000/callback/google',
                grant_type: 'authorization_code',
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true,
        },
        (err, httpResponse, body) => {
            console.log(body)

            const access_token = body.access_token

            console.log('==========')
            console.log(access_token)

            const user = request.get(
                {
                    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
                    qs: {
                        access_token: access_token
                    }
                },
                (err, httpResponse, body) => {
                    console.log(body)
                }
            )
        }
    )

    res.send('Maybe but YES')
})

module.exports = router
