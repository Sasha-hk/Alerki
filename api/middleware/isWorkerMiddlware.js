const UserService = require('../service/UserService')
const AuthError = require('../exception/AuthError')


module.exports = async (req, res, next) => {
    try {
        const userData = await UserService.findUserByID(req.accessToken.id)

        if (userData.profileType != 'worker') {
            throw AuthError.NotWorkerError()
        }
        
        req.user = userData

        next()
    }
    catch (e) {
        res.status(e.status || 500).json(e.errors)
    }
}