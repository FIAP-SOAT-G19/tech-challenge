import { IController } from '@/ports'
import { serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { IGetAllOrdersUseCase } from '@/ports/usecases/order/get-all-orders.port'

export class GetAllOrdersController implements IController {
  constructor(private readonly getAllOrdersUseCase: IGetAllOrdersUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.getAllOrdersUseCase.execute(input.query)
      return success(200, output)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
