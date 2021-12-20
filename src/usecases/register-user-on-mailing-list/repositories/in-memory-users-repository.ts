import { IUserData } from '../../../entities/dtos/user-data'
import { IUsersRepository } from '../ports/users-repository'

class InMemoryUsersRepository implements IUsersRepository {
  constructor (private repository: IUserData[]) {}

  async insertUser(user: IUserData): Promise<void> {
    const userExists = await this.userExists(user)
    if (!userExists) {
      this.repository.push(user)
    }
  }

  async findByEmail(email: string): Promise<IUserData | null> {
    const user = this.repository.find(user => user.email === email)
    return user || null
  }

  async findAllUsers(): Promise<IUserData[]> {
    return this.repository
  }

  async userExists(user: IUserData): Promise<boolean> {
    const findUser = await this.findByEmail(user.email)
    return !!findUser
  }
}

export { InMemoryUsersRepository }
