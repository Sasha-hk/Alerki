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
    console.log(code)

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
            }
        },
        (err, httpResponse, body) => {
            console.log(body)
            console.log(code)
        }
    )
 


    res.send('Maybe but YES')
})

router.get('/callback/token', (req, res) => {
    console.log(req.body)
    console.log(req.query)
    console.log('This is token !')
    res.send('Tone!')
})

// {
//     state: 'state_parameter_passthrough_value',
//     code: '4/0AX4XfWjKpDkAaLWz-PZ7DFgLJiloDVGaOTQtkiOPpR2PcUFAe3Xo2xGIH5a-MuDIagJIKg',
//     scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
// }

module.exports = router
