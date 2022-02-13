const request = require('supertest')
const {extractCookies} = require('../utils/extractCookies')
const app = require('../app')

let master = {
  email: 'email@gmail.com', username: 'workk', profileType: 'master', password: 'pass'
}
let client = {
  email: 'em@gmail.com', username: 'client', profileType: 'client', password: 'pas'
}

let services = null

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']


describe('Test authenticatin', () => {
  describe('registration', () => {
    test('with correct parameters => 200', async () => {
      const w = await request(app)
        .post('/auth/register')
        .send(master)
      
      expect(w.statusCode).toBe(200)
      expect(w.body).toBeTruthy()
      expect(w.body.accessToken).toBeTruthy()

      master = {
        ...master,
        ...w.body
      }
      master.refreshToken = extractCookies(w.headers).refreshToken.value

      const c = await request(app)
        .post('/auth/register')
        .send(client)
      
      expect(c.statusCode).toBe(200)
      expect(c.body).toBeTruthy()
      expect(c.body.accessToken).toBeTruthy()

      client = {
        ...client,
        ...c.body
      }
      client.refreshToken = extractCookies(c.headers).refreshToken.value
    })

    test('with incorrect parameters => 400', async () => {
      const r = await request(app)
        .post('/auth/register')
        .send({})
      
      expect(r.statusCode).toBe(400)
    })

    test('with same emails => 400', async () => {
      const r = await request(app)
        .post('/auth/register')
        .send(client)
      
      expect(r.statusCode).toBe(400)
    })
  })

  describe('logout', () => {
    test('logout master => 200', async () => {
      const r = await request(app)
        .get('/auth/log-out')
        .set('Cookie', ['refreshToken=' + master.refreshToken])
      
      expect(r.statusCode).toBe(200)
    })
  })

  describe('login', () => {
    test('with email => 200', async () => {
      const r = await request(app)
        .post('/auth/log-in')
        .send({
          email: master.email,
          password: master.password,
        })
      
      expect(r.statusCode).toBe(200)
    })

    test('with username => 200', async () => {
      const r = await request(app)
        .post('/auth/log-in')
        .send({
          username: master.username,
          password: master.password,
        })
      
      expect(r.statusCode).toBe(200)
    })

    test('with incorrect parameters => 400', async () => {
      const r = await request(app)
        .post('/auth/log-in')
        .send({
          ...master,
          password: 'bad password'
        })
      
      expect(r.statusCode).toBe(400)
    })
  })

  describe('refresh', () =>  {
    test('with correct parameters => 200', async () => {
      const r = await request(app)
        .get('/auth/refresh')
        .set('Cookie', ['refreshToken=' + master.refreshToken])
      
      expect(r.statusCode).toBe(200)
    })

    test('with incorrect parameters => 400', async () => {
      const r = await request(app)
        .get('/auth/refresh')
      
      expect(r.statusCode).toBe(400)
    })
  })

  describe('get user data', () =>  {
    test('with accessToken => 200', async () => {
      const w = await request(app)
        .get('/auth/user')
        .set('Cookie', ['accessToken=' + master.accessToken])
      
      expect(w.statusCode).toBe(200)

      master = {
        ...master,
        userData: w.body
      }

      const c = await request(app)
        .get('/auth/user')
        .set('Cookie', ['accessToken=' + client.accessToken])
      
      expect(c.statusCode).toBe(200)

      client = {
        ...client,
        userData: c.body
      }
    })

    test('without accessToken => 401', async () => {
      const r = await request(app)
        .get('/auth/user')
      
      expect(r.statusCode).toBe(401)
    })
  })
})

describe('Test services', () => {
  describe('create', () => {
    test('with correct parameterss => 200', async () => {
      const r = await request(app)
        .post('/services/create')
        .send({name: 'heircut'})
      
      expect(r.statusCode).toBe(200)
    })

    test('with correct parameters => 400', async () => {
      const r = await request(app)
        .post('/services/create')
      
      expect(r.statusCode).toBe(400)
    })
  })

  describe('find', () => {
    test('with correct parameterss => 200', async () => {
      const r = await request(app)
        .get('/services/find')
        .query({name: 'heircut'})
      
      expect(r.statusCode).toBe(200)
      expect(r.body[0].name).toBe('heircut')
      services = r.body
    })

    test('with incorrect parameters => 400', async () => {
      const r = await request(app)
        .get('/services/find')

      
      expect(r.statusCode).toBe(400)
    })
  })
})

let masterService = null
let masterSchedule = null
let weekendDay = null
let masterScheduleDate = null

describe('Test profile', () => {
  describe('get profile', () => {
    test('with exists profile => 200', async () => {
      const r = await request(app)
        .get('/profile/' + master.username)
      
      expect(r.statusCode).toBe(200)
      expect(r.body.masterID).toBeTruthy()
      expect(r.body.master).toBeTruthy()
    })

    test('with exists profile => 404', async () => {
      const r = await request(app)
        .get('/profile/not-exists')
       
      expect(r.statusCode).toBe(404)
    })
  })

  describe('create master service', () => {
    test('with exists service and master => 200', async () => {
      const r = await request(app)
        .post('/profile/create/service')
        .set('Cookie', ['accessToken=' + master.accessToken])
        .send({
          name: 'heircut',
          currency: 'UAN',
          price: 100,
          locatoin: 'St. Sambir',
          duration: 1000 * 60 * 20,
        })

      expect(r.statusCode).toBe(200)
    })

    test('with not exists service and master => 200', async () => {
      const r = await request(app)
        .post('/profile/create/service')
        .set('Cookie', ['accessToken=' + master.accessToken])
        .send({
          name: 'new service name',
          currency: 'UAN',
          price: 100,
          locatoin: 'St. Sambir',
          duration: 1000 * 60 * 20,
        })

      expect(r.statusCode).toBe(200)
    })

    test('with not a master => 400', async () => {
      const r = await request(app)
        .post('/profile/create/service')
        .set('Cookie', ['accessToken=' + client.accessToken])

      expect(r.statusCode).toBe(400)
    })
  })

  describe('get master services', () => {
    test('with exists profile => 200', async () => {
      const r = await request(app)
        .get('/profile/services/' + master.userData.masterID)
      
      expect(r.statusCode).toBe(200)
    })

    test('with not exists master id => 404', async () => {
      const r = await request(app)
        .get('/profile/services/100')
      
      expect(r.statusCode).toBe(404)
    })

    test('with string => 400', async () => {
      const r = await request(app)
        .get('/profile/services/not-exists')
       
      expect(r.statusCode).toBe(400)
    })
  })

  describe('find master', () => {
    test('with correct parameters => 200', async () => {
      const r = await request(app)
        .get('/profile/find-master')
        .query({service_id: services[0].id})
      
        
      expect(r.statusCode).toBe(200)
      masterService = r.body
    })

    test('with incorrect parameters => 400', async () => {
      const r = await request(app)
        .get('/profile/find-master') 
        
      expect(r.statusCode).toBe(400)
    })

    test('with not exists master service => 404', async () => {
      const r = await request(app)
        .get('/profile/find-master')
        .query({service_id: 10})
        
      expect(r.statusCode).toBe(404)
    })
  })

  describe('update master profile', () => {
    test('with correct parameters => 200', async () => {
      const r = await request(app)
        .patch('/profile/master/update')
        .set('Cookie', ['accessToken=' + master.accessToken])
        .send({
          workingStartTime: 1000 * 60 * 60 * 9,
          workingEndTime: 1000 * 60 * 60 * 16,
        })
        
      expect(r.statusCode).toBe(200)
    })

    test('with weekend days => 200', async () => {
      const r = await request(app)
        .patch('/profile/master/update/weekend-days')
        .set('Cookie', ['accessToken=' + master.accessToken])
        .send({
          weekendDays: {
            friday: true
          }
        })
      
      expect(r.statusCode).toBe(200)
    })

    test('without body => 400', async () => {
      const r = await request(app)
        .patch('/profile/master/update')
        .set('Cookie', ['accessToken=' + master.accessToken])
      
      expect(r.statusCode).toBe(400)
    })

    test('without authenticated user => 401', async () => {
      const r = await request(app)
        .patch('/profile/master/update')
        .send({
          workingStartTime: 1000 * 60 * 60 * 9,
          workingEndTime: 1000 * 60 * 60 * 16,
        })
      
      expect(r.statusCode).toBe(401)
    })
  })

  describe('set schedule', () => {
    test('set weekend day => 200', async () => {
      let scheduleDate = new Date()
      scheduleDate.setDate(scheduleDate.getDate() + 15)

      if (scheduleDate.getDate() == 5 || scheduleDate.getDate() == 6) {
        scheduleDate.setDate(scheduleDate.getDate() + 2)
      }

      masterScheduleDate = scheduleDate
      const r = await request(app)
        .post('/profile/master/set-schedule')
        .set('Cookie', ['accessToken=' + master.accessToken])
        .send({
          date: scheduleDate,
          weekendDay: true
        })
      
      expect(r.statusCode).toBe(200)
      weekendDays = r.body
    })

    test('set working time => 200', async () => {
      let scheduleDate = new Date()
      scheduleDate.setDate(scheduleDate.getDate() + 8)

      if (scheduleDate.getDate() == 5 || scheduleDate.getDate() == 6) {
        scheduleDate.setDate(scheduleDate.getDate() + 2)
      }

      const r = await request(app)
        .post('/profile/master/set-schedule')
        .set('Cookie', ['accessToken=' + master.accessToken])
        .send({
          workingStartTime: 6 * 60 * 60 * 1000,
          workingEndTime: 19 * 60 * 60 * 1000, 
          date: scheduleDate,
        })
      
      expect(r.statusCode).toBe(200)
      weekendDays = r.body
    })

    test('wiohout body date => 400', async () => {
      const r = await request(app)
        .post('/profile/master/set-schedule')
        .set('Cookie', ['accessToken=' + master.accessToken])
      
      expect(r.statusCode).toBe(400)
    })

    test('wiohout body parameters=> 400', async () => {
      const r = await request(app)
        .post('/profile/master/set-schedule')
        .set('Cookie', ['accessToken=' + master.accessToken])
        .send({
          date: new Date(),
        })
      
      expect(r.statusCode).toBe(400)
    })
  })

  describe('get schedule', () => {
    test('with correct parameters => 200', async () => {
      const r = await request(app)
        .get('/profile/get-schedule')
        .query({
          year: masterScheduleDate.getFullYear(),
          month: masterScheduleDate.getMonth(),
          master_id: masterService[0].id,
        })
      
      expect(r.statusCode).toBe(200)
      masterSchedule = r.body
    }) 

    test('without query => 400', async () => {
      const r = await request(app)
        .get('/profile/get-schedule')
      
      expect(r.statusCode).toBe(400)
    })

    test('with not exists master id => 404', async () => {
      const r = await request(app)
        .get('/profile/get-schedule')
        .query({
          year: 2004,
          month: 4,
          master_id: 1000,
        })
      
      expect(r.statusCode).toBe(404)
    })

    test('with string master id => 400', async () => {
      const r = await request(app)
        .get('/profile/get-schedule')
        .query({
          year: 2004,
          month: 4,
          master_id: 'asdfds',
        })
      
      expect(r.statusCode).toBe(400)
    })
  })

  describe('become master', () => {
    test('become master => 200', async () => {
      const r = await request(app)
        .patch('/profile/become-master')
        .set('Cookie', ['accessToken=' + client.accessToken])
      
      expect(r.statusCode).toBe(200)
    })

    test('become master one more time => return 200', async () => {
      const r = await request(app)
        .patch('/profile/become-master')
        .set('Cookie', ['accessToken=' + client.accessToken])
       
      expect(r.statusCode).toBe(200)
    })

    test('become client => return 200', async () => {
      const r = await request(app)
        .patch('/profile/become-client')
        .set('Cookie', ['accessToken=' + client.accessToken])
       
      expect(r.statusCode).toBe(200)
    })

    test('become client one more time => return 200', async () => {
      const r = await request(app)
        .patch('/profile/become-client')
        .set('Cookie', ['accessToken=' + client.accessToken])
      
      expect(r.statusCode).toBe(200)
    })
  })
})

let newAppointment = null
let appointmentTime = null

describe('Test appointments', () => {
  describe('create', () => {
    test('with correct parameters => 200', async () => {
      let timeCandedat = new Date()
      timeCandedat.setHours(0)
      timeCandedat.setTime(timeCandedat.getTime() + masterSchedule.workingStartTime)
      
      let weekendDaysMaxCound = 0 
      for (const w of Object.keys(masterSchedule.weekendDays)) {
        if (weekendDaysMaxCound == 7) {
          throw Error('All days is weekend')
        }
        if (masterSchedule.weekendDays[w]) {
          if (days.indexOf(w) == timeCandedat.getDay()) {
            timeCandedat.setDate(timeCandedat.getDate() + 2)
          }
          weekendDaysMaxCound += 1
        }
        else {
          if (days.indexOf(w) == timeCandedat.getDay()) {
            break
          }
        }
      }

      appointmentTime = timeCandedat
      
      const r = await request(app)
        .post('/appointment/make-appointment')
        .set('Cookie', ['accessToken=' + client.accessToken])
        .send({
          masterID: masterService[0].id,
          masterServiceID: masterService[0].service.id,
          appointmentStartTime: timeCandedat,
        })
      
      expect(r.statusCode).toBe(200)
      newAppointment = r.body
    })

    test('with not working time => 400', async () => {
      let timeCandedat = new Date()
      timeCandedat.setDate(timeCandedat.getDate() + 4)
      timeCandedat.setHours(0)
      timeCandedat.setTime(timeCandedat.getTime() + masterSchedule.workingStartTime)
      
      let weekendDaysMaxCound = 0 
      for (const w of Object.keys(masterSchedule.weekendDays)) {
        if (weekendDaysMaxCound == 7) {
          throw Error('All days is weekend')
        }
        if (masterSchedule.weekendDays[w]) {
          if (masterSchedule.weekendDays[w] == timeCandedat.getDay()) {
            timeCandedat.setDate(timeCandedat.getDate() + 1)
          }
          weekendDaysMaxCound += 1
        }
        else {
          if (days.indexOf(w) == timeCandedat.getDay()) {
            break
          }
        }
      }

      timeCandedat.setHours(0)

      
      const r = await request(app)
        .post('/appointment/make-appointment')
        .set('Cookie', ['accessToken=' + client.accessToken])
        .send({
          masterID: masterService[0].id,
          masterServiceID: masterService[0].service.id,
          appointmentStartTime: timeCandedat,
        })
      
      expect(r.statusCode).toBe(400)
    })
    
    test('with weekend date => 400', async () => {
      let timeCandedat = new Date()
      timeCandedat.getDate(timeCandedat.getDate() + 5)
      timeCandedat.setHours(0)
      timeCandedat.setTime(timeCandedat.getTime() + masterSchedule.workingStartTime)
      
      // generate appointemnt time to equeal master weekend day
      for (const w of Object.keys(masterSchedule.weekendDays)) {
        if (masterSchedule.weekendDays[w]) {
          if (timeCandedat.getDay() == days.indexOf(w)) {
            break
          }
          else {
            timeCandedat.setDate(timeCandedat.getDate() + (days.indexOf(w) - timeCandedat.getDay()))
            break
          }
        }
      }
      
      const r = await request(app)
        .post('/appointment/make-appointment')
        .set('Cookie', ['accessToken=' + client.accessToken])
        .send({
          masterID: masterService[0].id,
          masterServiceID: masterService[0].service.id,
          appointmentStartTime: timeCandedat,
        })
      
      expect(r.statusCode).toBe(400)
    })
    
    test('with busy appointment time => 400', async () => {
      const r = await request(app)
        .post('/appointment/make-appointment')
        .set('Cookie', ['accessToken=' + client.accessToken])
        .send({
          masterID: newAppointment.masterID,
          masterServiceID: newAppointment.masterServiceID,
          appointmentStartTime: appointmentTime,
        })
      
      expect(r.statusCode).toBe(400)
    })

    test('with schedule busy appointment time => 400', async () => {
      let time = new Date(masterScheduleDate)
      time.setHours(12)

      const r = await request(app)
        .post('/appointment/make-appointment')
        .set('Cookie', ['accessToken=' + client.accessToken])
        .send({ 
          masterID: masterService[0].id,
          masterServiceID: masterService[0].service.id,
          appointmentStartTime: time,
        })
      
      expect(r.statusCode).toBe(400)
    })
  })

  describe('details', () => {
    test('without slug => 404', async () => {
      const r = await request(app)
        .get('/appointment/details/asdeKK')
        .set('Cookie', ['accessToken=' + client.accessToken])

      expect(r.statusCode).toBe(404)
    })

    test('with not exists slug => 200', async () => {
      const r = await request(app)
        .get('/appointment/details/' + newAppointment.slug)
        .set('Cookie', ['accessToken=' + client.accessToken])

      expect(r.statusCode).toBe(200)
    })
  })

  describe('get day', () => {
    describe('client', () => {
      test('with correct time => 200', async () => {
        const r = await request(app)
          .get('/appointment/client/get-day')
          .query({date: appointmentTime})
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(200)
      })

      test('with incorrect time => 400', async () => {
        const r = await request(app)
          .get('/appointment/client/get-day')
          .query({date: 'asfdasfd'})
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(400)
      })

      test('without time => 400', async () => {
        const r = await request(app)
          .get('/appointment/client/get-day')
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(400)
      })
    })

    describe('master', () => {
      test('with correct time => 200', async () => {
        const r = await request(app)
          .get('/appointment/master/get-day')
          .query({date: appointmentTime})
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(200)
      })

      test('with incorrect time => 400', async () => {
        const r = await request(app)
          .get('/appointment/master/get-day')
          .query({date: 'asfdasfd'})
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(400)
      })

      test('without time => 400', async () => {
        const r = await request(app)
          .get('/appointment/master/get-day')
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(400)
      })
    })
  })

  describe('from now', () => {
    describe('client', () => {
      test('with correct time => 200', async () => {
        const date = new Date()
        date.setHours(1)

        const r = await request(app)
          .get('/appointment/client/from-now')
          .query({now: date})
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(200)
      })

      test('with incorrect time => 400', async () => {
        const r = await request(app)
          .get('/appointment/client/from-now')
          .query({now: 'asfdasfd'})
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(400)
      })

      test('without time => 400', async () => {
        const r = await request(app)
          .get('/appointment/client/from-now')
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(400)
      })
    })

    describe('master', () => {
      test('with correct time => 200', async () => {
        const date = new Date()
        date.setHours(1)

        const r = await request(app)
          .get('/appointment/master/from-now')
          .query({now: date})
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(200)
      })

      test('with incorrect time => 400', async () => {
        const r = await request(app)
          .get('/appointment/master/from-now')
          .query({now: 'asfdasfd'})
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(400)
      })

      test('without time => 400', async () => {
        const r = await request(app)
          .get('/appointment/master/from-now')
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(400)
      })
    })
  })

  describe('cancel', () => {
    describe('client', () => {
      test('with exists slug => 200', async () => {
        const r = await request(app)
          .patch('/appointment/client/cancel/' + newAppointment.slug)
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(200)
      })

      test('with other user => 400', async () => {
        const r = await request(app)
          .patch('/appointment/client/cancel/' + newAppointment.slug)
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(400)
      })

      test('with not exists slug => 404', async () => {
        const r = await request(app)
          .patch('/appointment/client/cancel/' + 'incorrect-slug')
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(404)
      })

      test('without time => 404', async () => {
        const r = await request(app)
          .patch('/appointment/client/cancel/')
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(404)
      })
    })

    describe('master', () => {
      test('with exists slug => 200', async () => {
        const r = await request(app)
          .patch('/appointment/master/cancel/' + newAppointment.slug)
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(200)
      })

      test('with other user => 400', async () => {
        const r = await request(app)
          .patch('/appointment/master/cancel/' + newAppointment.slug)
          .set('Cookie', ['accessToken=' + client.accessToken])
        
        expect(r.statusCode).toBe(400)
      })

      test('with not exissts slug => 404', async () => {
        const r = await request(app)
          .patch('/appointment/master/cancel/' + 'incorrect-slug')
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(404)
      })

      test('without slug => 404', async () => {
        const r = await request(app)
          .patch('/appointment/master/cancel/')
          .set('Cookie', ['accessToken=' + master.accessToken])
        
        expect(r.statusCode).toBe(404)
      })
    })
  })

  describe('confirm', () => {
    test('with exists slug => 200', async () => {
      const r = await request(app)
        .patch('/appointment/master/confirm/' + newAppointment.slug)
        .set('Cookie', ['accessToken=' + master.accessToken])
      
      expect(r.statusCode).toBe(200)
    })

    test('with client not master => 400', async () => {
      const r = await request(app)
        .patch('/appointment/master/confirm/' + newAppointment.slug)
        .set('Cookie', ['accessToken=' + client.accessToken])
      
      expect(r.statusCode).toBe(400)
    })

    test('with not exists slug => 404', async () => {
      const r = await request(app)
        .patch('/appointment/master/confirm/' + 'asfad')
        .set('Cookie', ['accessToken=' + master.accessToken])
      
      expect(r.statusCode).toBe(404)
    })

    test('without slug => 404', async () => {
      const r = await request(app)
        .patch('/appointment/master/confirm/')
        .set('Cookie', ['accessToken=' + master.accessToken])
      
      expect(r.statusCode).toBe(404)
    })
  })
})
