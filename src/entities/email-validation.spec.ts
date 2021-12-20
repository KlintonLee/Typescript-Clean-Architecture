import { Email } from './email'

describe('email-validation.spec.ts', () => {
  it('should not be able to accept null strings', () => {
    const isValid = new Email(null).validate()
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept undefined strings', () => {
    const isValid = new Email(undefined).validate()
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept empty strings', () => {
    const isValid = new Email('').validate()
    expect(isValid).toBeFalsy()
  })

  it('should accept valid emails', () => {
    const isValid = new Email('john.doe@email.com').validate()
    expect(isValid).toBeTruthy()
  })
})
