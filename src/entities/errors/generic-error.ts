class GenericError extends Error {
  constructor(message: string, public readonly name = 'Internal Server Error') {
    super(`Invalid params: ${message}`)
    this.name = name
  }
}

export { GenericError }
