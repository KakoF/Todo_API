const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

beforeAll(async () => {
    await User.deleteMany()
})
    
test('Deve chamar o method Get com sucesso', async() => {
    await request(app).get('/users').expect(200)
})

test('Deve chamar o method Post com sucesso', async() => {
    await request(app)
        .post('/users')
        .send({
            name: "Kako",
            email: "kakoferrare87@hotmail.com",
            password: "020964",
            age: 32
            
        })
        .expect(201)
})

test('Deve chamar o method Get retornando todos usuários', async() => {
    const response = await request(app).get('/users').expect(200)
    expect(response.body[0].name).toBe('Kako')
})




