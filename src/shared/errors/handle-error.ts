import { ClientNotFoundError, InvalidParamError, MissingParamError, ProductNotFoundError, SchemaValidationError } from '.'
import { badRequest, notFound, serverError } from '../helpers/http.helper'
import { HttpResponse } from '../types/http.types'

export const handleError = (error: any): HttpResponse => {
  if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof SchemaValidationError) {
    return badRequest(error)
  }

  if (error instanceof ClientNotFoundError || error instanceof ProductNotFoundError) {
    return notFound(error)
  }
  return serverError(error)
}
