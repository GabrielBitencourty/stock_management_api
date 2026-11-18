const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const app = require('../src/app.js')
const User = require('../src/model/User.js')

const credentials = {
    userEmail: 'integration@example.com',
    userName: 'Integration User',
    password: 'secure-password',
    confirmPassword: 'secure-password'
}

describe('authentication integration', () => {
    it('signs up with a hashed password and signs in with a JWT', async () => {
        const signupResponse = await request(app)
            .post('/authentication/signup')
            .send(credentials)

        expect(signupResponse.status).toBe(200)
        expect(signupResponse.body.token).toEqual(expect.any(String))
        expect(signupResponse.body.user).not.toHaveProperty('password')

        const savedUser = await User.findOne({ email: credentials.userEmail })
        expect(savedUser).not.toBeNull()
        expect(savedUser.password).not.toBe(credentials.password)
        await expect(bcrypt.compare(credentials.password, savedUser.password)).resolves.toBe(true)

        const signinResponse = await request(app)
            .post('/authentication/signin')
            .send({
                userEmail: credentials.userEmail,
                password: credentials.password
            })

        expect(signinResponse.status).toBe(200)
        expect(signinResponse.body.token).toEqual(expect.any(String))
        expect(jwt.verify(signinResponse.body.token, process.env.JWT_SECRET).email)
            .toBe(credentials.userEmail)

        const protectedResponse = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${signinResponse.body.token}`)

        expect(protectedResponse.status).toBe(200)
    })

    it('rejects invalid signup data through the validation middleware', async () => {
        const response = await request(app)
            .post('/authentication/signup')
            .send({
                ...credentials,
                userEmail: 'not-an-email'
            })

        expect(response.status).toBe(400)
        expect(response.body.statusCode).toBe(400)
    })

    it('rejects protected requests without a Bearer token', async () => {
        const response = await request(app).get('/users')

        expect(response.status).toBe(401)
        expect(response.body.statusCode).toBe(401)
    })
})
