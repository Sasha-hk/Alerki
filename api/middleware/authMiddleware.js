const AuthService = require('../service/AuthService')
const AuthError = require('../exception/AuthError')


module.exports = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken

        if (!accessToken) {
            throw AuthError.UnauthorizedError()
        }
        
        const decodedToken = await AuthService.verifyAccessToken(req.cookies.accessToken)

        if (!decodedToken) {
            throw AuthError.UnauthorizedError()
        }

        req.accessToken = decodedToken

        next()
    }
    catch(e) {
        res.status(e.status || 500).json(e.errors)
    }
}