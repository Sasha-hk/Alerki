const request = require('supertest')
const app = require('../app')
const dbConnect = require('../db/connect')

let accessToken = ''
let refreshToken = ''

let user = {}

const serviceDataSet = [
    {name: 'one'},
    {name: 'two'},
    {name: 'three'},
]

let foundServices = []


describe("Test authentication", () => {
    it('setup database', async () => {
        await dbConnect()
    });

    test('register users with correct data', async () => {
        const body = {
            email: 'emasdfail@gmail.com', firstName: 'loliir', lastName: 'dasd', profileType: 'worker', password: 'asdfaasdf'
        }

        const response = await request(app).post("/auth/register").send(body)
            
        expect(response.statusCode).toBe(200)
        expect(response.body.userData.email).toBe(body.email)
        expect(response.body.accessToken).toBeTruthy()
        accessToken = response.body.accessToken
    })

    test('register users with incorrect data', async () => {
        const body = {
            firstName: 'loliir', lastName: 'dasd', profileType: 'client', password: 'asdfaasdf'
        }

        const response = await request(app).post("/auth/register").send(body)
            
        expect(response.statusCode).toBe(400)
    })
})

describe('Test services', () => {
    test('create different services', async () => {
        for (const body of serviceDataSet) {
            const response = await request(app).post('/services/create').send(body)

            expect(response.statusCode).toBe(200)
            expect(response.body.name).toBe(body.name)
        }
    })

    test('create worker service from exists service', async () => {
        const body = {
            name: 'new-2',
            currency: 'UAN',
            price: '200',
            location: '2 Sambir',
            duration: 123123123,
        }
        
        const response = await request(app)
            .post('/profile/create/service')
            .set('Cookie', ['accessToken=' + accessToken])
            .send(body)
        
        expect(response.statusCode).toBe(200)
    })

    test('create worker service from not exists service', async () => {
        const body = {
            name: 'new-2',
            currency: 'UAN',
            price: '200',
            location: '2 Sambir',
            duration: 123123123,
        }
        const response = await request(app)
            .post('/profile/create/service')
            .set('Cookie', ['accessToken=' + accessToken])
            .send(body)

        expect(response.statusCode).toBe(200)
    })

    test('create worker service with bad parammeters', async () => {
        const body = {
            name: 'new-service',
        }
        const response = await request(app)
            .post('/profile/create/service')
            .set('Cookie', ['accessToken=' + accessToken])
            .send(body)

        expect(response.statusCode).toBe(400)
    })


    test('find different services', async () => {
        for (const body of serviceDataSet) {
            const response = await request(app).get('/services/find').query({name: body.name})

            expect(response.statusCode).toBe(200)
        }
    })

    describe('find worker', () => {
        test('find service', async () => {
            const response = await request(app).get('/services/find').query({name: serviceDataSet[0].name})

            expect(response.statusCode).toBe(200)
            foundServices = response.body
        }) 
        
        test('find worker', async () => {
            const response = await request(app).get('/appointment/find-worker').query({serviceID: foundServices[0].id})

            expect(response.statusCode).toBe(200)
        })
    })
})