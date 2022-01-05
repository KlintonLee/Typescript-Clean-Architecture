import express from 'express'
import setupMiddleware from './middlewares'
import setupRoutes from './routes/express-router'

const app = express()
setupMiddleware(app)
setupRoutes(app)

export default app
