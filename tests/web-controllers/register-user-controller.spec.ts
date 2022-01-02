import { IHttpRequest, IHttpResponse } from '../../src/controllers/ports'
import { IUserData } from '../../src/entities/dtos'
import { InMemoryUsersRepository } from '../usecases/repositories/in-memory-users-repository'
import { RegisterUserOnMailingList } from '../../src/usecases/register-user-on-mailing-list'
import { RegisterUserController } from '../../src/controllers/register-user-controller'

let users: Array<IUserData>
let repo: InMemoryUsersRepository
let usecase: RegisterUserOnMailingList
let controller: RegisterUserController
describe('register-user-controller.spec.ts', () => {
  beforeEach(() => {
    users = []
    repo = new InMemoryUsersRepository(users)
    usecase = new RegisterUserOnMailingList(repo)

    controller = new RegisterUserController(usecase)
  })

  it('should return status code 201 when requests contains valid user data', async () => {
    const request: IHttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe@email.com'
      }
    }

    const response: IHttpResponse = await controller.handle(request)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(request.body)
  })
})
