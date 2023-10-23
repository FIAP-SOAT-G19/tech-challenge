import { IController, IGetOrderByNumberUseCase } from '@/ports'
import { success, HttpRequest, HttpResponse, handleError } from '@/shared'

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
