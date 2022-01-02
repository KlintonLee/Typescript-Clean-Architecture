import { IUserData } from '../entities/dtos'
import { InvalidParamsError } from '../entities/errors'
import { RegisterUserOnMailingList } from '../usecases/register-user-on-mailing-list'
import { IHttpRequest, IHttpResponse } from './ports'

class RegisterUserController {
  private readonly httpResponse: IHttpResponse = {
    statusCode: 400,
    body: {}
  }

  constructor (private readonly usecase: RegisterUserOnMailingList) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const userData: IUserData = request.body
    if (!userData.name || !userData.email) {
      this.httpResponse.body = new InvalidParamsError('name or email is invalid.')
      return this.httpResponse
    }

    const response = await this.usecase.registerUserOnMailingList(userData)

    if (response.isRight()) {
      this.httpResponse.statusCode = 201
    }

    this.httpResponse.body = response.value
    return this.httpResponse
  }
}

export { RegisterUserController }
