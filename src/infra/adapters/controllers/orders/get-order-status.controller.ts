import { IController } from '@/application/interfaces'
import { IGetOrderStatusUseCase } from '@/application/interfaces/usecases/order/get-order-status.interface'
import { HttpRequest, HttpResponse, handleError, success } from '@/infra/shared'

export class GetOrderStatusController implements IController {
  constructor(private readonly getOrderStatusUseCase: IGetOrderStatusUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.getOrderStatusUseCase.execute(input.params.orderNumber)
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
