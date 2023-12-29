import { IController } from '@/application/interfaces'
import { IUpdateClientUseCase } from '@/application/interfaces/usecases/client/update-client.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class UpdateClientController implements IController {
  constructor(private readonly updateClientUseCase: IUpdateClientUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const clientId = await this.updateClientUseCase.execute({ ...input.body, ...input.params })
      return success(200, { clientId })
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
