import { InvalidParamError, MissingParamError, SchemaValidationError } from '.'
import { badRequest, serverError } from '../helpers/http.helper'
import { HttpResponse } from '../types/http.types'

export const handleError = (error: any): HttpResponse => {
  if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof SchemaValidationError) {
    return badRequest(error)
  }
  return serverError(error)
}
