import { HttpResponse } from '../types/http.types'

export const success = (statusCode: number, body: any): HttpResponse => ({
  statusCode,
  body
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.name,
    message: error.message
  }
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})
