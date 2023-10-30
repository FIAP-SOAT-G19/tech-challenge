import { ICreateOrderUseCase, IController } from '@/ports/'
import { HttpRequest, HttpResponse, handleError, success } from '@/shared'

export class CreateOrderController implements IController {
  constructor(private readonly createOrderUseCase: ICreateOrderUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.createOrderUseCase.execute(input.body)
      return success(201, output)
    } catch (error: any) {
      return handleError(error)
    }
  }
}
