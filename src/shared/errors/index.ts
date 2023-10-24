export class InvalidParamError extends Error {
  constructor(param: string) {
    super(`Invalid param: ${param}`)
    this.name = 'InvalidParamError'
    this.message = `Invalid param: ${param}`
  }
}

export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Missing param: ${param}`)
    this.name = 'MissingParamError'
  }
}

export class SchemaValidationError extends Error {
  constructor(error: any) {
    super(error.message)
    this.name = 'SchemaValidationError'
    this.message = error.message
  }
}

export class ServerError extends Error {
  constructor(error?: Error) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class ClientNotFoundError extends Error {
  statusCode = 404
  constructor() {
    super('Client not found error')
  }
}
export class ProductNotFoundError extends Error {
  constructor () {
    super('Product not found error')
    this.name = 'NotFoundError'
  }
}
