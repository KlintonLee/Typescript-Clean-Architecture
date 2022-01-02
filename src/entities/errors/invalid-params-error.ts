import { IHttpRequest } from '../../controllers/ports'

class InvalidParamsError extends Error {
  public readonly name = 'InvalidParamsName'
  constructor(params: IHttpRequest) {
    super(`Invalid params: ${params}`)
  }
}

export { InvalidParamsError }
