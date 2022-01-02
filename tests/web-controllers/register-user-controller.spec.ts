import { IHttpRequest, IHttpResponse } from '../../src/controllers/ports'
import { IUserData } from '../../src/entities/dtos'
import { InMemoryUsersRepository } from '../usecases/repositories/in-memory-users-repository'
import { RegisterUserOnMailingList } from '../../src/usecases/register-user-on-mailing-list'
import { RegisterUserController } from '../../src/controllers/register-user-controller'
import { InvalidEmailError, InvalidNameError, GenericError } from '../../src/entities/errors'

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

  it('should return status code 400 when request contains invalid name', async () => {
    const request: IHttpRequest = {
      body: {
        name: 'a',
        email: 'john.doe@email.com'
      }
    }

    const response: IHttpResponse = await controller.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  it('should return status 400 when request containts invalid email', async () => {
    const request: IHttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe'
      }
    }

    const response: IHttpResponse = await controller.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  it('should return status 400 when request is missing name as params', async () => {
    const request: IHttpRequest = {
      body: {
        email: 'john.doe'
      }
    }

    const response: IHttpResponse = await controller.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(GenericError)
  })

  it('should return status 400 when request is missing email as params', async () => {
    const request: IHttpRequest = {
      body: {
        name: 'john.doe'
      }
    }

    const response: IHttpResponse = await controller.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(GenericError)
  })
})
