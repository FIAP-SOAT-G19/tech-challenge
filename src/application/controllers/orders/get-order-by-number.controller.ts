import { IController } from '@/ports'
import { IGetOrderByNumberUseCase } from '@/ports/usecases/order/get-order-by-number.port'
import { success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { handleError } from '../../../shared/errors/handle-error'

export class GetOrderByNumberController implements IController {
  constructor(private readonly getOrderByNumberUseCase: IGetOrderByNumberUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.getOrderByNumberUseCase.execute(input.params.orderNumber)
      return success(200, output)
    } catch (error: any) {
      return handleError(error)
    }
  }
}
