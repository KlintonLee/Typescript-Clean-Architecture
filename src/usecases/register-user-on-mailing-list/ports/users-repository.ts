import { IUserData } from '../../../entities/dtos'

interface IUsersRepository {
  insertUser(user: IUserData): Promise<void>
  findByEmail(email: string): Promise<IUserData | null>
  findAllUsers(): Promise<IUserData[]>
  userExists(user: IUserData): Promise<boolean>
}

export { IUsersRepository }
