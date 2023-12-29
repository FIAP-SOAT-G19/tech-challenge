import { IController, IDeleteOrderUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class DeleteOrderController implements IController {
  constructor(private readonly deleteOrderUseCase: IDeleteOrderUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deleteOrderUseCase.execute(input.params.orderNumber)
      return success(204, null)
    } catch (error: any) {
      return handleError(error)
    }
  }
}
