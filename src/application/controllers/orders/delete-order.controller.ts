import { IController } from '@/ports'
import { IDeleteOrderUseCase } from '@/ports/usecases/order/delete-order.port'
import { badRequest, serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { InvalidParamError, MissingParamError, SchemaValidationError } from '../../../shared/errors'

export class DeleteOrderController implements IController {
  constructor(private readonly deleteOrderUseCase: IDeleteOrderUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deleteOrderUseCase.execute(input.params.orderNumber)
      return success(204, null)
    } catch (error: any) {
      if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof SchemaValidationError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
