import { Email } from '../../src/entities'

describe('email-validation.spec.ts', () => {
  it('should not be able to accept null strings', () => {
    const isValid = Email.validate(null)
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept undefined strings', () => {
    const isValid = Email.validate(undefined)
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept empty strings', () => {
    const isValid = Email.validate('')
    expect(isValid).toBeFalsy()
  })

  it('should accept valid emails', () => {
    const isValid = Email.validate('john.doe@email.com')
    expect(isValid).toBeTruthy()
  })

  it('should not be able to accept empty local part', () => {
    const isValid = Email.validate('@email.com')
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept local part larger than 64 chars', () => {
    const email = 'a'.repeat(65) + '@email.com'
    const isValid = Email.validate(email)
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept empty domain', () => {
    const isValid = Email.validate('john.doe@')
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept domain larger than 255 chars', () => {
    const email = 'john.doe@.' + 'com'.repeat(85)
    const isValid = Email.validate(email)
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept each domain part larger than 63 chars', () => {
    const email = 'john.doe@email.com.' + 'br'.repeat(32)
    const isValid = Email.validate(email)
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept invalid chars', () => {
    const isValid = Email.validate('john doe@email.com')
    expect(isValid).toBeFalsy()
  })
})
