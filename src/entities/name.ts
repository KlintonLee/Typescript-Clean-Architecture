import { Either, left, right } from '../shared/either'
import { InvalidNameError } from './errors/invalid-name-error'

class Name {
  private constructor (private readonly value: string) {}

  static create(name: string): Either<InvalidNameError, Name> {
    const isValid = Name.validate(name)
    if (isValid) {
      return right(new Name(name))
    }

    return left(new InvalidNameError())
  }

  static validate(name: string | null | undefined): boolean {
    if (!name) {
      return false
    }

    const nameLength = name.trim().length
    if (nameLength < 2 || nameLength > 256) {
      return false
    }

    return true
  }
}

export { Name }
