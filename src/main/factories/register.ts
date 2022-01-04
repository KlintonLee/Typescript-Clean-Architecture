import { RegisterUserController } from '../../controllers/register-user-controller'
import { InMemoryUsersRepository } from '../../../tests/usecases/repositories/in-memory-users-repository'
import { RegisterUserOnMailingList } from '../../usecases/register-user-on-mailing-list'

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUsersRepository = new InMemoryUsersRepository([])
  const registerUserOnMailingList = new RegisterUserOnMailingList(inMemoryUsersRepository)

  const registerUserController = new RegisterUserController(registerUserOnMailingList)

  return registerUserController
}
