const request = require('supertest')
const {extractCookies} = require('../utils/extractCookies')
const app = require('../app')


const worker = {
    email: 'email@gmail.com', username: 'workk', profileType: 'worker', password: 'pass'
}
const client = {
    email: 'em@gmail.com', username: 'client', profileType: 'client', password: 'pas'
}


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

