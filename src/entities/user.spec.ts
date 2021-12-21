import { User } from './user'
import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'

describe('user.spec.ts', () => {
  it('should not be able to create an user with invalid email', () => {
    const invalidEmail = 'john.doe'
    const error = User.create({ name: 'John Doe', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })
})
