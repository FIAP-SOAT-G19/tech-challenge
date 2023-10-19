import { IController } from '@/ports'
import { IUpdateOrderStatusUseCase } from '@/ports/usecases/order/update-oder-status.port'
import { badRequest, serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { InvalidParamError, MissingParamError, SchemaValidationError } from '../../../shared/errors'

export class UpdateOrderStatusController implements IController {
  constructor(private readonly updateOrderStatusUseCase: IUpdateOrderStatusUseCase) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.updateOrderStatusUseCase.execute({
        orderNumber: input.params.orderNumber,
        status: input.body.status
      })
      return success(204, null)
    } catch (error: any) {
      if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof SchemaValidationError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
