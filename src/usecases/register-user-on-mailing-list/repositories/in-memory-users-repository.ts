import { IUserData } from '../dtos/user-data'
import { IUsersRepository } from '../ports/users-repository'

class InMemoryUsersRepository implements IUsersRepository {
  constructor (private repository: IUserData[]) {}

  async insertUser(user: IUserData): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<IUserData | null> {
    return null
  }

  async findAllUsers(): Promise<IUserData[]> {
    throw new Error('Method not implemented.')
  }

  async userExists(user: IUserData): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

export { InMemoryUsersRepository }
