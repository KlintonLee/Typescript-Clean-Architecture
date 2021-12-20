import { IUserData } from '../dtos/user-data'
import { InMemoryUsersRepository } from './in-memory-users-repository'

describe('in-memory-users-repository.spec.ts', () => {
  it('should return null if user it not found', async () => {
    const users: Array<IUserData> = []
    const usersRepo = new InMemoryUsersRepository(users)
    const user = await usersRepo.findByEmail('john.doe@email.com')
    expect(user).toBeNull()
  })
})
