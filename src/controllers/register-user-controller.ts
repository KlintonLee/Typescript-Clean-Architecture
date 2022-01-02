import { IUserData } from '../entities/dtos'
import { GenericError } from '../entities/errors'
import { IUseCases } from '../usecases/register-user-on-mailing-list/ports'
import { IHttpRequest, IHttpResponse } from './ports'

class RegisterUserController {
  private readonly httpResponse: IHttpResponse = {
    statusCode: 400,
    body: {}
  }

  constructor (private readonly usecase: IUseCases) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const userData: IUserData = request.body
      if (!userData.name || !userData.email) {
        this.httpResponse.body = new GenericError('name or email is invalid.', 'InvalidParamsError')
        return this.httpResponse
      }

      const response = await this.usecase.perform(userData)

      if (response.isRight()) {
        this.httpResponse.statusCode = 201
      }

      this.httpResponse.body = response.value
    } catch (err) {
      this.httpResponse.statusCode = 500
      this.httpResponse.body = new GenericError('Something went wrong, contact the support team.')
    }
    return this.httpResponse
  }
}

export { RegisterUserController }
