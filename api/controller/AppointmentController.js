const AppointmentService = require('../service/AppointmentService')
const WorkerServiceService = require('../service/WorkerServicesService')
const ProfileService = require('../service/ProfileService')
const oneExists = require('../utils/oneExists.js')


class AppointmentController {
    async clientDetails(req, res, next) {
        try {
            const slug = req.params.slug

            res.json('ok')
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientList(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientListToday(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientMake(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async clientCancel(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerDetails(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerList(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerListToday(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerCancel(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async workerConfirm(req, res, next) {
        try {
            
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }

    async findWorker(req, res, next) {
        try {
            const {serviceID} = req.query

            oneExists({serviceID})

            let workersResult = null
            const workerServices = await WorkerServiceService.findService(serviceID)

            for (const w of workerServices) {
                console.log(w)
                const foundWorker = await ProfileService.findWorkerByID(w.workerID)
                console.log(foundWorker)
                workersResult.push(foundWorker)
            }
            
            res.json(workersResult)
        }
        catch(e) {
            res.status(e.status || 500).json(e.errors)
        }
    }
}


module.exports = new AppointmentController()
