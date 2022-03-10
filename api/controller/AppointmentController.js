const AppointmentService = require('../service/AppointmentService')
const UserService = require('../service/UserService')
const checkParams = require('../utils/validators/checkParams')
const AppointmentError = require('../exception/AppointmentError')


class AppointmentController {
  async details(req, res, next) {
    try {
      const slug = req.params.slug


      checkParams.all({slug})

      const details = await AppointmentService.details({slug})

      if (!details) {
        throw AppointmentError.NotFoundError()
      }

      res.json(details)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errrors)
    }
  }

  async clientGetDay(req, res, next) {
    try {
      const date = req.query.date
    
      checkParams.all({
        date,
      })

      const dayAppointments = await AppointmentService.clientGetDay({
        clientID: req.accessToken.clientID, 
        date,
      })

      res.json(dayAppointments)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errrors)
    }
  }

  async clientFromNow(req, res, next) {
    try {
      const now = req.query.now

      checkParams.all({
        now,
      })

      const foundAppointments = await AppointmentService.clientFromNow({
        clientID: req.accessToken.clientID,
        now,
      })

      res.json(foundAppointments)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errrors)
    }
  }

  async masterGetDay(req, res, next) {
    try {
      const date = req.query.date
    
      checkParams.all({
        date,
      })

      const dayAppointments = await AppointmentService.masterGetDay({
        masterID: req.accessToken.masterID, 
        date,
      })

      res.json(dayAppointments)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errrors)
    }
  }

  async masterFromNow(req, res, next) {
    try {
      const now = req.query.now

      checkParams.all({
        now,
      })

      const foundAppointments = await AppointmentService.masterFromNow({
        masterID: req.accessToken.masterID,
        now,
      })

      res.json(foundAppointments)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errrors)
    }
  }

  async create(req, res, next) {
    try {
      const user = await UserService.findUserByID({id: req.accessToken.id})
      const {
        masterID,
        masterServiceID,
        appointmentStartTime,
      } = req.body
            
      checkParams.all({
        masterID,
        masterServiceID,
        appointmentStartTime,
      })

      // check if user make appointment to herself
      if (masterID == user?.masterID) {
        throw AppointmentError.ForHimselfError()
      }

      const newAppointment = await AppointmentService.create({
        masterID,
        masterServiceID,
        clientID: user.clientID,
        appointmentStartTime: new Date(appointmentStartTime),
      })

      res.json(newAppointment)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errors)
    }
  }

  async clientCancel(req, res, next) {
    try {
      const slug = req.params.slug

      checkParams.all({
        slug,
      })

      const updatedAppointment = await AppointmentService.clientCancel({
        clientID: req.accessToken.clientID,
        slug,
      })

      res.json(updatedAppointment)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errrors)
    }
  }

  async masterCancel(req, res, next) {
    try {
      const slug = req.params.slug

      checkParams.all({
        slug,
      })

      const updatedAppointment = await AppointmentService.masterCancel({
        masterID: req.accessToken.masterID,
        slug,
      })
            
      res.json(updatedAppointment)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errrors)
    }
  }

  async masterConfirm(req, res, next) {
    try {
      const slug = req.params.slug

      checkParams.all({
        slug,
      })

      const updatedAppointment = await AppointmentService.masterConfirm({
        masterID: req.accessToken.masterID,
        slug,
      })
            
      res.json(updatedAppointment)
    }
    catch (e) {
      res.status(e.status || 500).json(e.errrors)
    }
  }
}


module.exports = new AppointmentController()
