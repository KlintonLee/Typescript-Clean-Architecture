import { IUserData } from '../../src/entities/dtos'
import { IUsersRepository } from '../../src/usecases/register-user-on-mailing-list/ports'
import { RegisterUserOnMailingList } from '../../src/usecases/register-user-on-mailing-list'
import { InMemoryUsersRepository } from '../../src/usecases/repositories/in-memory-users-repository'

describe('register-user-on-mailing-list.spec.ts', () => {
  it('should add user with complete data on mailing list', async () => {
    const users: Array<IUserData> = []
    const repo: IUsersRepository = new InMemoryUsersRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const name = 'John Doe'
    const email = 'john.doe@email.com'
    const response = await usecase.perform({ name, email })
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
    const response = await usecase.perform({ name, email: invalidEmail })
    const user = await repo.userExists({ name, email: invalidEmail })
    expect(user).toBeFalsy()
    expect(response.value.name).toEqual('InvalidEmailError')
  })

  it('should not add user with invalid name', async () => {
    const users: Array<IUserData> = []
    const repo: IUsersRepository = new InMemoryUsersRepository(users)
    const usecase : RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)

    const invalidName = 'a'
    const email = 'John.doe@email.com'
    const response = await usecase.perform({ name: invalidName, email })
    const user = await repo.userExists({ name: invalidName, email })
    expect(user).toBeFalsy()
    expect(response.value.name).toEqual('InvalidNameError')
  })
})
