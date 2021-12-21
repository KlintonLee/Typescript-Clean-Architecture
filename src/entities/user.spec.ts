import { User } from './user'
import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'

describe('user.spec.ts', () => {
  it('should not be able to create an user with invalid email', () => {
    const invalidEmail = 'john.doe'
    const error = User.create({ name: 'John Doe', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  it('should not be able to create an user with invalid name (too few characters)', () => {
    const invalidName = 'O    '
    const error = User.create({ name: invalidName, email: 'john.doe@email.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  it('should not be able to create an user with invalid name (too many characters)', () => {
    const invalidName = 'a'.repeat(257)
    const error = User.create({ name: invalidName, email: 'john.doe@email.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })
})
