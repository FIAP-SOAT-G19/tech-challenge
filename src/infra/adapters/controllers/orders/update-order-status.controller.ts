import { IController, IUpdateOrderStatusUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

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
      return handleError(error)
    }
  }
}
