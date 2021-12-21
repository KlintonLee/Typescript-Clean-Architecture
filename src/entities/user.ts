import { IUserData } from './dtos/user-data'
import { Either, left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { Email } from './email'

class User {
  static create(userData: IUserData): Either<User, InvalidEmailError> | undefined {
    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}

export { User }
