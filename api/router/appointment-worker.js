const Router = require('express')

const router = new Router()


router
    .get('/details/:slug')
    .get('/list')
    .get('/list/today')

router
    .patch('/cancel/:slug')
    .patch('/confirm/:slug')


module.exports = router
