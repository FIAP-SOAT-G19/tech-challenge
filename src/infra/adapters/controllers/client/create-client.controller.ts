import { IController } from '@/application/interfaces'
import { ICreateClientUseCase } from '@/application/interfaces/usecases/client/create-client.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class CreateClientController implements IController {
  constructor(private readonly createClientUseCase: ICreateClientUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const clientId = await this.createClientUseCase.execute(input.body)
      return success(201, { clientId })
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
