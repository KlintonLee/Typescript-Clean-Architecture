class Email {
  constructor (private email: string | null | undefined) {}

  public validate(): boolean {
    if (!this.email) {
      return false
    }

    const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!emailRegex.test(this.email)) {
      return false
    }

    const [local, domain] = this.email.split('@')
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
