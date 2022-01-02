class InvalidParamsError extends Error {
  public readonly name = 'InvalidParamsName'
  constructor(message: string) {
    super(`Invalid params: ${message}`)
  }
}

export { InvalidParamsError }
