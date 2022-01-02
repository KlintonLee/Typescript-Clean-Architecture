import { IUserData } from '../../entities/dtos'
import { InvalidEmailError, InvalidNameError } from '../../entities/errors'
import { User } from '../../entities'
import { Either, left, right } from '../../shared'
import { IUsersRepository, IUseCases } from './ports'

class RegisterUserOnMailingList implements IUseCases {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async perform(request: IUserData):
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
