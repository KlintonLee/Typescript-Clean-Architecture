import { IUserData } from './dtos/user-data'
import { Either, left } from '../shared/either'
import { Name } from './name'
import { Email } from './email'
import { InvalidNameError } from './errors/invalid-name-error'
import { InvalidEmailError } from './errors/invalid-email-error'

class User {
  static create(userData: IUserData): Either<InvalidNameError | InvalidEmailError, User> | undefined {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }

    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}

export { User }
