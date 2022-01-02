import { IUserData } from './dtos/user-data'
import { Either, left, right } from '../shared/either'
import { Name } from './name'
import { Email } from './email'
import { InvalidNameError } from './errors/invalid-name-error'
import { InvalidEmailError } from './errors/invalid-email-error'

class User {
  private constructor (
    readonly name: Name,
    readonly email: Email
  ) {}

  static create(userData: IUserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    const name: Name = nameOrError.value as Name
    const email: Email = emailOrError.value as Email
    return right(new User(name, email))
  }
}

export { User }
