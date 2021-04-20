const supertest = require('supertest');
const request = require('supertest');
const dbConfig = require('./data/dbConfig.js')

const server = require('./server.js');


beforeEach(async () => {
    await dbConfig.truncate('users')
  })
  
  describe('/api/users', () => {
    it('should return succesfull register message', async () => {
        const expectedStatusCode = 201;
        const response = await request(server).post('/api/users').send({ username: 'sticky' })
        expect(response.status).toEqual(expectedStatusCode)
    })
    it('should return 400 error when no username', async () => {
        const expectedStatusCode = 400;
        const response = await request(server).post('/api/users').send({})
        expect(response.status).toEqual(expectedStatusCode)
    })
})

describe('/api/users/:username', () => {
    it('Should throw error when username does not exist', async () => {
        const expectedStatusCode = 400;
        const response = await request(server).delete('/api/users/sticky')
        expect(response.status).toEqual(expectedStatusCode)
    })
    it('Should successfully delete user', async () => {
        const expectedStatusCode = 204;
        await request(server).post('/api/users').send({ username: 'sticky' })
        const response = await request(server).delete('/api/users/sticky')
        expect(response.status).toEqual(expectedStatusCode)
    })
});