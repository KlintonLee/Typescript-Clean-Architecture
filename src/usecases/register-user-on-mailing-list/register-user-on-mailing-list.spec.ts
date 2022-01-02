import { IUserData } from '../../entities/dtos/user-data'
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
})
