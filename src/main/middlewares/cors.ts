import { Request, Response, NextFunction } from 'express'

const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access_control_allow_origin', '*')
  res.set('access_control_allow_headers', '*')
  res.set('access_control_allow_methods', '*')

  next()
}

export { cors }
