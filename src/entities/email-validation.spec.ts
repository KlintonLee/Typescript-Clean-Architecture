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

  it('should not be able to accept empty local part', () => {
    const isValid = new Email('@email.com').validate()
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept local part larger than 64 chars', () => {
    const email = 'a'.repeat(65) + '@email.com'
    const isValid = new Email(email).validate()
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept empty domain', () => {
    const isValid = new Email('john.doe@').validate()
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept domain larger than 255 chars', () => {
    const email = 'john.doe@.' + 'com'.repeat(85)
    const isValid = new Email(email).validate()
    expect(isValid).toBeFalsy()
  })

  it('should not be able to accept each domain part larger than 63 chars', () => {
    const email = 'john.doe@email.com.' + 'br'.repeat(32)
    const isValid = new Email(email).validate()
    expect(isValid).toBeFalsy()
  })
})
