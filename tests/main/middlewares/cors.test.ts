import request from 'supertest'
import app from '../../../src/main/config/app'

describe('cors.test.ts', () => {
  it('should enable CORS', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_cors')
      .expect('access_control_allow_origin', '*')
      .expect('access_control_allow_headers', '*')
      .expect('access_control_allow_methods', '*')
  })
})
