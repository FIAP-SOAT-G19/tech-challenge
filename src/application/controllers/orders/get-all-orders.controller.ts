import { IController, IGetAllOrdersUseCase } from '@/ports'
import { success, HttpRequest, HttpResponse, handleError } from '@/shared'

export class GetAllOrdersController implements IController {
  constructor(private readonly getAllOrdersUseCase: IGetAllOrdersUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.getAllOrdersUseCase.execute(input.query)
      return success(200, output)
    } catch (error: any) {
      return handleError(error)
    }
  }
}
