import { Express } from 'express'
import expressRouter from './routes/express-router'

export default (app: Express): void => {
  expressRouter(app)
}
