class Email {
  constructor (private email: string | null | undefined) {}

  public validate(): boolean {
    if (!this.email) {
      return false
    }
    return true
  }
}

export { Email }
