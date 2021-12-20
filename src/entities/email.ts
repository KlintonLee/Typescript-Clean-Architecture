class Email {
  constructor (private email: string | null | undefined) {}

  public validate(): boolean {
    if (!this.email) {
      return false
    }

    const [local, domain] = this.email.split('@')
    if (local.length === 0 || local.length > 64) {
      return false
    }

    if (domain.length > 255) {
      return false
    }

    return true
  }
}

export { Email }
