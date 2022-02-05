const request = require('supertest')
const {extractCookies} = require('../utils/extractCookies')
const app = require('../app')


let worker = {
    email: 'email@gmail.com', username: 'workk', profileType: 'worker', password: 'pass'
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
                .send(worker)
            
            expect(w.statusCode).toBe(200)
            expect(w.body).toBeTruthy()
            expect(w.body.accessToken).toBeTruthy()

            worker = {
                ...worker,
                ...w.body
            }
            worker.refreshToken = extractCookies(w.headers).refreshToken.value

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
        test('logout worker => 200', async () => {
            const r = await request(app)
                .get('/auth/log-out')
                .set('Cookie', ['refreshToken=' + worker.refreshToken])
            
            expect(r.statusCode).toBe(200)
        })
    })

    describe('login', () => {
        test('with correct parameters => 200', async () => {
            const r = await request(app)
                .post('/auth/log-in')
                .send({
                    ...worker,
                })
            
            expect(r.statusCode).toBe(200)
        })

        test('with incorrect parameters => 400', async () => {
            const r = await request(app)
                .post('/auth/log-in')
                .send({
                    ...worker,
                    password: 'bad password'
                })
            
            expect(r.statusCode).toBe(400)
        })
    })

    describe('refresh', () =>  {
        test('with correct parameters => 200', async () => {
            const r = await request(app)
                .get('/auth/refresh')
                .set('Cookie', ['refreshToken=' + worker.refreshToken])
            
            expect(r.statusCode).toBe(200)
        })

        test('with incorrect parameters => 400', async () => {
            const r = await request(app)
                .get('/auth/refresh')
            
            expect(r.statusCode).toBe(400)
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

let workerService = null
let workerSchedule = null
let weekendDay = null
let workerScheduleDate = null

describe('Test profile', () => {
    describe('get profile', () => {
        test('with exists profile => 200', async () => {
            console.log(worker.username)
            const r = await request(app)
                .get('/profile/' + worker.username)
            
            expect(r.statusCode).toBe(200)
            expect(r.body.workerID).toBeTruthy()
            expect(r.body.worker).toBeTruthy()
        })

        test('with exists profile => 404', async () => {
            console.log(worker.username)
            const r = await request(app)
                .get('/profile/not-exists')
             
            expect(r.statusCode).toBe(404)
        })
    })
    describe('create worker service', () => {
        test('with exists service and worker => 200', async () => {
            const r = await request(app)
                .post('/profile/create/service')
                .set('Cookie', ['accessToken=' + worker.accessToken])
                .send({
                    name: 'heircut',
                    currency: 'UAN',
                    price: 100,
                    locatoin: 'St. Sambir',
                    duration: 1000 * 60 * 20,
                })

            expect(r.statusCode).toBe(200)
        })

        test('with not exists service and worker => 200', async () => {
            const r = await request(app)
                .post('/profile/create/service')
                .set('Cookie', ['accessToken=' + worker.accessToken])
                .send({
                    name: 'new service name',
                    currency: 'UAN',
                    price: 100,
                    locatoin: 'St. Sambir',
                    duration: 1000 * 60 * 20,
                })

            expect(r.statusCode).toBe(200)
        })

        test('with not a worker => 400', async () => {
            const r = await request(app)
                .post('/profile/create/service')
                .set('Cookie', ['accessToken=' + client.accessToken])

            expect(r.statusCode).toBe(400)
        })
    })

    describe('find worker', () => {
        test('with correct parameters => 200', async () => {
            const r = await request(app)
                .get('/profile/find-worker')
                .query({service_id: services[0].id})
            
                
            expect(r.statusCode).toBe(200)
            workerService = r.body
        })

        test('with incorrect parameters => 400', async () => {
            const r = await request(app)
                .get('/profile/find-worker') 
                
            expect(r.statusCode).toBe(400)
        })

        test('with not exists worker service => 404', async () => {
            const r = await request(app)
                .get('/profile/find-worker')
                .query({service_id: 10})
                
            expect(r.statusCode).toBe(404)
        })
    })

    describe('update worker profile', () => {
        test('with correct parameters => 200', async () => {
            const r = await request(app)
                .patch('/profile/worker/update')
                .set('Cookie', ['accessToken=' + worker.accessToken])
                .send({
                    workingStartTime: 1000 * 60 * 60 * 9,
                    workingEndTime: 1000 * 60 * 60 * 16,
                })
            
            expect(r.statusCode).toBe(200)
        })

        test('with weekend days => 200', async () => {
            const r = await request(app)
                .patch('/profile/worker/update/weekend-days')
                .set('Cookie', ['accessToken=' + worker.accessToken])
                .send({
                    weekendDays: {
                        friday: true
                    }
                })
            
            expect(r.statusCode).toBe(200)
        })

        test('without body => 400', async () => {
            const r = await request(app)
                .patch('/profile/worker/update')
                .set('Cookie', ['accessToken=' + worker.accessToken])
            
            expect(r.statusCode).toBe(400)
        })

        test('without authenticated user => 401', async () => {
            const r = await request(app)
                .patch('/profile/worker/update')
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

            workerScheduleDate = scheduleDate
            const r = await request(app)
                .post('/profile/worker/set-schedule')
                .set('Cookie', ['accessToken=' + worker.accessToken])
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
                .post('/profile/worker/set-schedule')
                .set('Cookie', ['accessToken=' + worker.accessToken])
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
                .post('/profile/worker/set-schedule')
                .set('Cookie', ['accessToken=' + worker.accessToken])
            
            expect(r.statusCode).toBe(400)
        })

        test('wiohout body parameters=> 400', async () => {
            const r = await request(app)
                .post('/profile/worker/set-schedule')
                .set('Cookie', ['accessToken=' + worker.accessToken])
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
                    year: workerScheduleDate.getFullYear(),
                    month: workerScheduleDate.getMonth(),
                    worker_id: workerService[0].id,
                })
            
            expect(r.statusCode).toBe(200)
            workerSchedule = r.body
        }) 

        test('without query => 400', async () => {
            const r = await request(app)
                .get('/profile/get-schedule')
            
            expect(r.statusCode).toBe(400)
        })

        test('with not exists worker id => 404', async () => {
            const r = await request(app)
                .get('/profile/get-schedule')
                .query({
                    year: 2004,
                    month: 4,
                    worker_id: 1000,
                })
            
            expect(r.statusCode).toBe(404)
        })

        test('with string worker id => 400', async () => {
            const r = await request(app)
                .get('/profile/get-schedule')
                .query({
                    year: 2004,
                    month: 4,
                    worker_id: 'asdfds',
                })
            
            expect(r.statusCode).toBe(400)
        })
    })

    describe('become worker', () => {
        test('with correct parameters => 200', async () => {
            const r = await request(app)
                .patch('/profile/become-worker')
                .set('Cookie', ['accessToken=' + client.accessToken])
            
            expect(r.statusCode).toBe(200)
        })

        test('create one more worker => return 400', async () => {
            const r = await request(app)
                .patch('/profile/become-worker')
                .set('Cookie', ['accessToken=' + client.accessToken])
            
            expect(r.statusCode).toBe(400)
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
            timeCandedat.setTime(timeCandedat.getTime() + workerSchedule.workingStartTime)
            
            let weekendDaysMaxCound = 0 
            for (const w of Object.keys(workerSchedule.weekendDays)) {
                if (weekendDaysMaxCound == 7) {
                    throw Error('All days is weekend')
                }
                if (workerSchedule.weekendDays[w]) {
                    if (workerSchedule.weekendDays[w] == timeCandedat.getDay()) {
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

            appointmentTime = timeCandedat
            
            const r = await request(app)
                .post('/appointment/make-appointment')
                .set('Cookie', ['accessToken=' + client.accessToken])
                .send({
                    workerID: workerService[0].id,
                    workerServiceID: workerService[0].service.id,
                    appointmentStartTime: timeCandedat,
                })
            
            expect(r.statusCode).toBe(200)
            newAppointment = r.body
        })

        test('with not working time => 400', async () => {
            let timeCandedat = new Date()
            timeCandedat.setDate(timeCandedat.getDate() + 4)
            timeCandedat.setHours(0)
            timeCandedat.setTime(timeCandedat.getTime() + workerSchedule.workingStartTime)
            
            let weekendDaysMaxCound = 0 
            for (const w of Object.keys(workerSchedule.weekendDays)) {
                if (weekendDaysMaxCound == 7) {
                    throw Error('All days is weekend')
                }
                if (workerSchedule.weekendDays[w]) {
                    if (workerSchedule.weekendDays[w] == timeCandedat.getDay()) {
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
                    workerID: workerService[0].id,
                    workerServiceID: workerService[0].service.id,
                    appointmentStartTime: timeCandedat,
                })
            
            expect(r.statusCode).toBe(400)
        })
        
        test('with weekend date => 400', async () => {
            let timeCandedat = new Date()
            timeCandedat.getDate(timeCandedat.getDate() + 5)
            timeCandedat.setHours(0)
            timeCandedat.setTime(timeCandedat.getTime() + workerSchedule.workingStartTime)
            
            // generate appointemnt time to equeal worker weekend day
            for (const w of Object.keys(workerSchedule.weekendDays)) {
                if (workerSchedule.weekendDays[w]) {
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
                    workerID: workerService[0].id,
                    workerServiceID: workerService[0].service.id,
                    appointmentStartTime: timeCandedat,
                })
            
            expect(r.statusCode).toBe(400)
        })
        
        test('with busy appointment time => 400', async () => {
            const r = await request(app)
                .post('/appointment/make-appointment')
                .set('Cookie', ['accessToken=' + client.accessToken])
                .send({
                    workerID: newAppointment.workerID,
                    workerServiceID: newAppointment.workerServiceID,
                    appointmentStartTime: appointmentTime,
                })
            
            expect(r.statusCode).toBe(400)
        })

        test('with schedule busy appointment time => 400', async () => {
            let time = new Date(workerScheduleDate)
            time.setHours(12)

            const r = await request(app)
                .post('/appointment/make-appointment')
                .set('Cookie', ['accessToken=' + client.accessToken])
                .send({ 
                    workerID: workerService[0].id,
                    workerServiceID: workerService[0].service.id,
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

        describe('worker', () => {
            test('with correct time => 200', async () => {
                const r = await request(app)
                    .get('/appointment/worker/get-day')
                    .query({date: appointmentTime})
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
                expect(r.statusCode).toBe(200)
            })

            test('with incorrect time => 400', async () => {
                const r = await request(app)
                    .get('/appointment/worker/get-day')
                    .query({date: 'asfdasfd'})
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
                expect(r.statusCode).toBe(400)
            })

            test('without time => 400', async () => {
                const r = await request(app)
                    .get('/appointment/worker/get-day')
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
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

        describe('worker', () => {
            test('with correct time => 200', async () => {
                const date = new Date()
                date.setHours(1)

                const r = await request(app)
                    .get('/appointment/worker/from-now')
                    .query({now: date})
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
                expect(r.statusCode).toBe(200)
            })

            test('with incorrect time => 400', async () => {
                const r = await request(app)
                    .get('/appointment/worker/from-now')
                    .query({now: 'asfdasfd'})
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
                expect(r.statusCode).toBe(400)
            })

            test('without time => 400', async () => {
                const r = await request(app)
                    .get('/appointment/worker/from-now')
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
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
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
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

        describe('worker', () => {
            test('with exists slug => 200', async () => {
                const r = await request(app)
                    .patch('/appointment/worker/cancel/' + newAppointment.slug)
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
                expect(r.statusCode).toBe(200)
            })

            test('with other user => 400', async () => {
                const r = await request(app)
                    .patch('/appointment/worker/cancel/' + newAppointment.slug)
                    .set('Cookie', ['accessToken=' + client.accessToken])
                
                expect(r.statusCode).toBe(400)
            })

            test('with not exissts slug => 404', async () => {
                const r = await request(app)
                    .patch('/appointment/worker/cancel/' + 'incorrect-slug')
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
                expect(r.statusCode).toBe(404)
            })

            test('without slug => 404', async () => {
                const r = await request(app)
                    .patch('/appointment/worker/cancel/')
                    .set('Cookie', ['accessToken=' + worker.accessToken])
                
                expect(r.statusCode).toBe(404)
            })
        })
    })

    describe('confirm', () => {
        test('with exists slug => 200', async () => {
            const r = await request(app)
                .patch('/appointment/worker/confirm/' + newAppointment.slug)
                .set('Cookie', ['accessToken=' + worker.accessToken])
            
            expect(r.statusCode).toBe(200)
        })

        test('with client not worker => 400', async () => {
            const r = await request(app)
                .patch('/appointment/worker/confirm/' + newAppointment.slug)
                .set('Cookie', ['accessToken=' + client.accessToken])
            
            expect(r.statusCode).toBe(400)
        })

        test('with not exists slug => 404', async () => {
            const r = await request(app)
                .patch('/appointment/worker/confirm/' + 'asfad')
                .set('Cookie', ['accessToken=' + worker.accessToken])
            
            expect(r.statusCode).toBe(404)
        })

        test('without slug => 404', async () => {
            const r = await request(app)
                .patch('/appointment/worker/confirm/')
                .set('Cookie', ['accessToken=' + worker.accessToken])
            
            expect(r.statusCode).toBe(404)
        })
    })
})
