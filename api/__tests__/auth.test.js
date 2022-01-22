const request = require('supertest')
const {extractCookies} = require('../utils/extractCookies')
const app = require('../app')


const worker = {
    email: 'email@gmail.com', username: 'workk', profileType: 'worker', password: 'pass'
}
const client = {
    email: 'em@gmail.com', username: 'client', profileType: 'client', password: 'pas'
}

let services = null


describe('Test authenticatin', () => {
    describe('registration', () => {
        test('with correct parameters', async () => {
            const w = await request(app)
                .post('/auth/register')
                .send(worker)
            
            expect(w.statusCode).toBe(200)
            expect(w.body).toBeTruthy()
            expect(w.body.accessToken).toBeTruthy()

            worker.accessToken = w.body.accessToken
            worker.refreshToken = extractCookies(w.headers).refreshToken.value

            const c = await request(app)
                .post('/auth/register')
                .send(client)
            
            expect(c.statusCode).toBe(200)
            expect(c.body).toBeTruthy()
            expect(c.body.accessToken).toBeTruthy()

            client.accessToken = c.body.accessToken
            client.refreshToken = extractCookies(c.headers).refreshToken.value
        })

        test('with incorrect parameters', async () => {
            const r = await request(app)
                .post('/auth/register')
                .send({})
            
            expect(r.statusCode).toBe(400)
        })

        test('with same emails', async () => {
            const r = await request(app)
                .post('/auth/register')
                .send(client)
            
            expect(r.statusCode).toBe(400)
        })
    })

    describe('logout', () => {
        test('logout worker', async () => {
            const r = await request(app)
                .get('/auth/log-out')
                .set('Cookie', ['refreshToken=' + worker.refreshToken])
            
            expect(r.statusCode).toBe(200)
        })
    })

    describe('login', () => {
        test('with correct parameters', async () => {
            const r = await request(app)
                .post('/auth/log-in')
                .send({
                    ...worker,
                })
            
            expect(r.statusCode).toBe(200)
        })

        test('with incorrect parameters', async () => {
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
        test('with correct parameters', async () => {
            const r = await request(app)
                .get('/auth/refresh')
                .set('Cookie', ['refreshToken=' + worker.refreshToken])
            
            expect(r.statusCode).toBe(200)
        })

        test('with incorrect parameters', async () => {
            const r = await request(app)
                .get('/auth/refresh')
            
            expect(r.statusCode).toBe(400)
        })
    })
})

describe('Test services', () => {
    describe('create', () => {
        test('with correct parameterss', async () => {
            const r = await request(app)
                .post('/services/create')
                .send({name: 'heircut'})
            
            expect(r.statusCode).toBe(200)
        })

        test('with correct parameters', async () => {
            const r = await request(app)
                .post('/services/create')
            
            expect(r.statusCode).toBe(400)
        })
    })

    describe('find', () => {
        test('with correct parameterss', async () => {
            const r = await request(app)
                .get('/services/find')
                .query({name: 'heircut'})
            
            expect(r.statusCode).toBe(200)
            expect(r.body[0].name).toBe('heircut')
            services = r.body
        })

        test('with incorrect parameters', async () => {
            const r = await request(app)
                .get('/services/find')

            
            expect(r.statusCode).toBe(400)
        })
    })
})

let workerService = null

describe('Test profile', () => {
    describe('create worker service', () => {
        test('with exists service and worker', async () => {
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

        test('with not exists service and worker', async () => {
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

        test('with not a worker', async () => {
            const r = await request(app)
                .post('/profile/create/service')
                .set('Cookie', ['accessToken=' + client.accessToken])

            expect(r.statusCode).toBe(400)
        })
    })

    describe('find worker', () => {
        test('with correct parameters', async () => {
            const r = await request(app)
                .get('/profile/find-worker')
                .query({service_id: services[0].id})
            
                
            expect(r.statusCode).toBe(200)
            workerService = r.body
        })

        test('with incorrect parameters', async () => {
            const r = await request(app)
                .get('/profile/find-worker') 
                
            expect(r.statusCode).toBe(400)
        })

        test('with not exists worker service', async () => {
            const r = await request(app)
                .get('/profile/find-worker')
                .query({service_id: 10})
                
            expect(r.statusCode).toBe(404)
        })
    })

    describe('update worker profile', () => {
        test('with correct parameters', async () => {
            const r = await request(app)
                .patch('/profile/worker/update')
                .set('Cookie', ['accessToken=' + worker.accessToken])
                .send({
                    workingTimeFrom: 1000 * 60 * 60 * 9,
                    workingTimeTo: 1000 * 60 * 60 * 16,
                })
            
            expect(r.statusCode).toBe(200)
        })

        test('with weekend days', async () => {
            const r = await request(app)
                .patch('/profile/worker/update/weekend-days')
                .set('Cookie', ['accessToken=' + worker.accessToken])
                .send({
                    weekendDays: {
                        friday: true
                    }
                })
            
            console.log(r.body)
            expect(r.statusCode).toBe(200)
        })

        test('without body', async () => {
            const r = await request(app)
                .patch('/profile/worker/update')
                .set('Cookie', ['accessToken=' + worker.accessToken])
            
            expect(r.statusCode).toBe(400)
        })

        test('without authenticated user', async () => {
            const r = await request(app)
                .patch('/profile/worker/update')
                .send({
                    workingTimeFrom: 1000 * 60 * 60 * 9,
                    workingTimeTo: 1000 * 60 * 60 * 16,
                })
            
            expect(r.statusCode).toBe(401)
        })
    })

    describe('get schedule', () => {
        test('with correct parameters', async () => {
            const r = await request(app)
                .get('/profile/get-schedule')
                .query({
                    year: 2004,
                    month: 4,
                    worker_id: workerService[0].id,
                })
            
            console.log(r.body)
            expect(r.statusCode).toBe(200)
        }) 

        test('without query', async () => {
            const r = await request(app)
                .get('/profile/get-schedule')
            
            expect(r.statusCode).toBe(400)
        })

        test('with not exists worker id', async () => {
            const r = await request(app)
                .get('/profile/get-schedule')
                .query({
                    year: 2004,
                    month: 4,
                    worker_id: 1000,
                })
            
            expect(r.statusCode).toBe(404)
        })

        test('with string worker id', async () => {
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
        test('with correct parameters', async () => {
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