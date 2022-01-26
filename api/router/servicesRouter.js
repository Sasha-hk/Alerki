const Router = require('express')
const ServiceController = require('../controller/ServiceController')
const router = new Router()


router
    .get(
        '/find',
        ServiceController.findByName
    )

router
    .post(
        '/create',
        ServiceController.create
    )


module.exports = router
