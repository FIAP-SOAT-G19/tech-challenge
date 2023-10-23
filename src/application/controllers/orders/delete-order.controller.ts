import { IController, IDeleteOrderUseCase } from '@/ports'
import { success, HttpRequest, HttpResponse, handleError } from '@/shared'

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
