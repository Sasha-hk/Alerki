const Router = require('express')
const AuthController = require('../controller/AuthController')
const router = new Router()


router
    .post('/register', AuthController.register)
    .post('/log-in', AuthController.login)

router
    .get('/log-out', AuthController.logout)
    .get('/refresh', AuthController.refresh)
    .get('/login/google', AuthController.withGoogle)
    .get('/callbach/google', AuthController.callbackGoogle)


module.exports = router
