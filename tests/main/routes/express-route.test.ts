import request from 'supertest'
import app from '../../../src/main/config/app'

describe('express-route.test.ts', () => {
  it('should return an account on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/api/register')
      .send({
        name: 'John Doe',
        email: 'john.doe@email.com'
      })
      .expect(201)
  })
})
