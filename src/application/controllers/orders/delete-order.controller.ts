import { IController } from '@/ports'
import { IDeleteOrderUseCase } from '@/ports/usecases/order/delete-order.port'
import { serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'

export class DeleteOrderController implements IController {
  constructor(private readonly deleteOrderUseCase: IDeleteOrderUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deleteOrderUseCase.execute(input.params.orderNumber)
      return success(204, null)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
