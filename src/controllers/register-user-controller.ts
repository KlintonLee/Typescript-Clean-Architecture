import { IUserData } from '../entities/dtos'
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
    const response = await this.usecase.registerUserOnMailingList(userData)

    if (response.isRight()) {
      this.httpResponse.statusCode = 201
      this.httpResponse.body = userData
    }

    return this.httpResponse
  }
}

export { RegisterUserController }
