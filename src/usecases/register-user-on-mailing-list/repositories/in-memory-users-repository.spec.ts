import { IUserData } from '../dtos/user-data'
import { InMemoryUsersRepository } from './in-memory-users-repository'

describe('in-memory-users-repository.spec.ts', () => {
  it('should return null if user it not found', async () => {
    const users: Array<IUserData> = []
    const usersRepo = new InMemoryUsersRepository(users)
    const user = await usersRepo.findByEmail('john.doe@email.com')
    expect(user).toBeNull()
  })

  it('should return an user if found in the repository', async () => {
    const users: Array<IUserData> = []
    const usersRepo = new InMemoryUsersRepository(users)
    const userMock = {
      name: 'John Doe',
      email: 'john.doe@email.com'
    }
    await usersRepo.insertUser(userMock)

    const user = await usersRepo.findByEmail('john.doe@email.com')
    expect(user?.name).toBe('John Doe')
  })
})
