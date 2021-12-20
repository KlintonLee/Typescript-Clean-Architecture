import { IUserData } from '../dtos/user-data'
import { InMemoryUsersRepository } from './in-memory-users-repository'

describe('in-memory-users-repository.spec.ts', () => {
  it('should return null if user it not found', async () => {
    const users: Array<IUserData> = []
    const sut = new InMemoryUsersRepository(users)
    const user = await sut.findByEmail('john.doe@email.com')
    expect(user).toBeNull()
  })

  it('should return an user if found in the repository', async () => {
    const users: Array<IUserData> = []
    const sut = new InMemoryUsersRepository(users)
    const userMock = {
      name: 'John Doe',
      email: 'john.doe@email.com'
    }
    await sut.insertUser(userMock)

    const user = await sut.findByEmail('john.doe@email.com')
    expect(user?.name).toBe('John Doe')
  })

  it('should return all users from repository', async () => {
    const users: Array<IUserData> = []
    const sut = new InMemoryUsersRepository(users)
    const usersMock = [
      { name: 'John Doe', email: 'john.doe@email.com' },
      { name: 'John Tre', email: 'john.tre@email.com' }
    ]
    users.push(...usersMock)

    const allUsers = await sut.findAllUsers()
    expect(allUsers).toEqual(usersMock)
  })
})
