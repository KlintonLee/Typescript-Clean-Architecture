class Email {
  constructor (private email: string | null | undefined) {}

  public validate(): boolean {
    if (!this.email) {
      return false
    }

    const [local] = this.email.split('@')
    if (local.length > 64) {
      return false
    }

    return true
  }
}

export { Email }
