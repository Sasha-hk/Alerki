const AppointmentService = require('../service/AppointmentService')
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
}


module.exports = new AppointmentController()
