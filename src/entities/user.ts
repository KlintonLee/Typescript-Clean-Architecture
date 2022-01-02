import { IUserData } from './dtos'
import { Either, left, right } from '../shared'
import { InvalidNameError, InvalidEmailError } from './errors'
import { Email, Name } from '.'

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
