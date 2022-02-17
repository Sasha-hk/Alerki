const Router = require('express')
const AuthController = require('../controller/AuthController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()


router
    .post('/register', AuthController.register)
    .post('/log-in', AuthController.login)

router
    .get('/log-out', AuthController.logout)
    .get('/refresh', AuthController.refresh)
    .get('/callback/google', AuthController.withGoogle)
    .get(
        '/user', 
        authMiddleware,
        AuthController.user
    )


module.exports = router
