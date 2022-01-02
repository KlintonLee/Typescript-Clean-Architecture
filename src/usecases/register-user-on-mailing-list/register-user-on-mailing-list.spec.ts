import { IUserData } from '../../entities/dtos/user-data'
import { InvalidEmailError } from '../../entities/errors/invalid-email-error'
import { InvalidNameError } from '../../entities/errors/invalid-name-error'
import { left } from '../../shared/either'
import { IUsersRepository } from './ports/users-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InMemoryUsersRepository } from './repositories/in-memory-users-repository'

describe('register-user-on-mailing-list.spec.ts', () => {
  it('should add user with complete data on mailing list', async () => {
    const users: Array<IUserData> = []
    const repo: IUsersRepository = new InMemoryUsersRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const name = 'John Doe'
    const email = 'john.doe@email.com'
    const response = await usecase.registerUserOnMailingList({ name, email })
    const user = await repo.findByEmail('john.doe@email.com')
    expect(user?.name).toBe('John Doe')
    expect(response.value.name).toBe('John Doe')
  })

  it('should not add user with invalid email', async () => {
    const users: Array<IUserData> = []
    const repo: IUsersRepository = new InMemoryUsersRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const name = 'John Doe'
    const invalidEmail = 'invalid_email'
    const response = await usecase.registerUserOnMailingList({ name, email: invalidEmail })
    const user = await repo.userExists({ name, email: invalidEmail })
    expect(user).toBeFalsy()
    expect(response).toEqual(left(new InvalidEmailError()))
  })

  it('should not add user with invalid name', async () => {
    const users: Array<IUserData> = []
    const repo: IUsersRepository = new InMemoryUsersRepository(users)
    const usecase : RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const invalidName = 'a'
    const email = 'John.doe@email.com'
    const response = await usecase.registerUserOnMailingList({ name: invalidName, email })
    const user = await repo.userExists({ name: invalidName, email })
    expect(user).toBeFalsy()
    expect(response).toEqual(left(new InvalidNameError()))
  })
})
