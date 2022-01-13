const AuthService = require('../service/AuthService')
const AuthError = require('../exception/AuthError')


module.exports = (req, res, next) => {
    try {
        const decodedToken = AuthService.verifyAccessToken(req.cookies.accessToken)

        if (!decodedToken) {
            throw AuthError.UnauthorizedError()
        }
        
        next()
    }
    catch(e) {
        console.log(e)
        res.status(e.status || 500).json(e.errors)
    }
}