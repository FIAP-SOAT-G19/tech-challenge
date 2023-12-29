import { IController, IGetOrderByNumberUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

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
