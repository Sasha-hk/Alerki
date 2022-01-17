const request = require('supertest')
const app = require('../server')
const dbConnect = require('../db/connect')

let accessToken = ''
let refreshToken = ''

let user = {}

const serviceDataSet = [
    {name: 'one'},
    {name: 'two'},
    {name: 'three'},
]


describe("Test authentication", () => {
    it('setup database', async () => {
        await dbConnect()
    });

    test('register users with correct data', async () => {
        const body = {
            email: 'emasdfail@gmail.com', firstName: 'loliir', lastName: 'dasd', profileType: 'client', password: 'asdfaasdf'
        }

        const response = await request(app).post("/auth/register").send(body)
            
        expect(response.statusCode).toBe(200)
        expect(response.body.userData.email).toBe(body.email)
        expect(response.body.accessToken).toBeTruthy()
        accessToken = response.body.accessToken
    })
})
describe('Test services', () => {
    test('create services', async () => {
        for (const body of serviceDataSet) {
            const response = await request(app).post('/services/create').send(body)

            expect(response.statusCode).toBe(200)
            expect(response.body.name).toBe(body.name)
        }
    })

    test('find services', async () => {
        for (const body of serviceDataSet) {
            const response = await request(app).get('/services/find').query({name: body.name})

            expect(response.statusCode).toBe(200)
        }
    })
})