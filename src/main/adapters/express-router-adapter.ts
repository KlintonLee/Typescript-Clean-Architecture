import { RegisterUserController } from '../../controllers'
import { Request, Response } from 'express'
import { IHttpRequest } from '../../controllers/ports/http-request'

const adaptRoute = (controller: RegisterUserController) => {
  return async (req: Request, res: Response): Promise<Response> => {
    const httpRequest:IHttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export { adaptRoute }
