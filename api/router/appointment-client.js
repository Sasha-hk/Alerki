const Router = require('express')

const router = new Router()


router
    .get('/details/:slug')
    .get('/list')
    .get('/list/today')

router
    .post('/make')

router
    .patch('/cancel/:slug')


module.exports = router
