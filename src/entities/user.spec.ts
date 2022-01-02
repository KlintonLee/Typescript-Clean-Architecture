import { User } from './user'

describe('user.spec.ts', () => {
  it('should not be able to create an user with invalid email', () => {
    const invalidEmail = 'john.doe'
    const error = User.create({ name: 'John Doe', email: invalidEmail }).value as Error
    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual('Invalid email: john.doe.')
  })

  it('should not be able to create an user with invalid name (too few characters)', () => {
    const invalidName = 'O    '
    const error = User.create({ name: invalidName, email: 'john.doe@email.com' }).value as Error
    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`)
  })

  it('should not be able to create an user with invalid name (too many characters)', () => {
    const invalidName = 'a'.repeat(257)
    const error = User.create({ name: invalidName, email: 'john.doe@email.com' }).value as Error
    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`)
  })

  it('should be able to create a valid user', () => {
    const user: User = User.create({ name: 'John Doe', email: 'john.doe@email.com' }).value as User
    expect(user.name.value).toEqual('John Doe')
    expect(user.email.value).toEqual('john.doe@email.com')
  })
})
