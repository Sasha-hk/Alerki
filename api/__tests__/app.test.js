const request = require('supertest')
const app = require('../server')
const dbConnect = require('../db/connect')

const accessToken = ''
const refreshToken = ''


describe("POST /users", () => {
    it('setup database', async () => {
        await dbConnect()
    });

    describe("test auth", () => {
        test("should save the username and password to the database", async () => {
            const bodyData = [
                {
                    email: 'email@gmail.com', firstName: 'l', lastName: 'd', profileType: 'worker', password: 'asdf'
                },
            ]

            for (const body of bodyData) {
                const response = await request(app).post("/auth/register").send(body)

                expect(response.statusCode).toBe(200)
                expect(response.body.userData.email).toBe(body.email)
                expect(response.body.accessToken).toBeTruthy()
                accessToken = response.body.accessToken
            }
        })
    })
})