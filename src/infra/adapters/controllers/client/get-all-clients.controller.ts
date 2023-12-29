import { IController } from '@/application/interfaces'
import { IGetAllClientsUseCase } from '@/application/interfaces/usecases/client/get-all-clients.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class GetAllClientsController implements IController {
  constructor(private readonly getAllClientsUseCase: IGetAllClientsUseCase) { }

  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const client = await this.getAllClientsUseCase.execute(input.query)
      return success(200, client)
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
