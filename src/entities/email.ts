import { Either, left, right } from '../shared'
import { InvalidEmailError } from './errors'

class Email {
  private constructor (readonly value: string) {}

  static create(email: string): Either<InvalidEmailError, Email> {
    const isValid = Email.validate(email)
    if (isValid) {
      return right(new Email(email))
    }
    return left(new InvalidEmailError(email))
  }

  static validate(email: string | null | undefined): boolean {
    if (!email) {
      return false
    }

    const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!emailRegex.test(email)) {
      return false
    }

    const [local, domain] = email.split('@')
    if (local.length === 0 || local.length > 64) {
      return false
    }

    if (domain.length === 0 || domain.length > 255) {
      return false
    }

    const domainParts = domain.split('.')
    const hasLargerThan63 = domainParts.some(domainPart => domainPart.length > 63)
    if (hasLargerThan63) {
      return false
    }

    return true
  }
}

export { Email }
