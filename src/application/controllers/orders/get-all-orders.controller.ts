import { IController } from '@/ports'
import { badRequest, serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { IGetAllOrdersUseCase } from '@/ports/usecases/order/get-all-orders.port'
import { InvalidParamError, MissingParamError, SchemaValidationError } from '../../../shared/errors'

export class GetAllOrdersController implements IController {
  constructor(private readonly getAllOrdersUseCase: IGetAllOrdersUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.getAllOrdersUseCase.execute(input.query)
      return success(200, output)
    } catch (error: any) {
      if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof SchemaValidationError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
