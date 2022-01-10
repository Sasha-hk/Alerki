const Router = require('express')
const router = new Router()


router
    .post('/register')
    .post('/log-in')

router
    .get('/log-out')
    .get('/refresh')
    .get('/login/google')
    .get('/login/apple')
    .get('/callbach/google')
    .get('/callbach/apple')


module.exports = router
