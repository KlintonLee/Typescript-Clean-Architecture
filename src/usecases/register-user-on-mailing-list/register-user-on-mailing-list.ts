import { IUserData } from '../../entities/dtos/user-data'
import { InvalidEmailError } from '../../entities/errors/invalid-email-error'
import { InvalidNameError } from '../../entities/errors/invalid-name-error'
import { User } from '../../entities/user'
import { Either, left, right } from '../../shared/either'
import { IUsersRepository } from './ports/users-repository'

class RegisterUserOnMailingList {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async registerUserOnMailingList(request: IUserData):
    Promise<Either<InvalidNameError | InvalidEmailError, IUserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const userExists = await this.usersRepository.userExists(request)
    if (!userExists) {
      await this.usersRepository.insertUser(request)
    }

    return right(request)
  }
}

export { RegisterUserOnMailingList }
