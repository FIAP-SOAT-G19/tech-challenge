import { ICreateOrderUseCase, IController } from '@/ports/'
import { badRequest, serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { InvalidParamError, MissingParamError, SchemaValidationError } from '../../../shared/errors'

export class CreateOrderController implements IController {
  constructor(private readonly createOrderUseCase: ICreateOrderUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.createOrderUseCase.execute(input.body)
      return success(201, output)
    } catch (error: any) {
      if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof SchemaValidationError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
