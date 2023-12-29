import { IController } from '@/application/interfaces'
import { IDeleteClientUseCase } from '@/application/interfaces/usecases/client/delete-client.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class DeleteClientController implements IController {
  constructor(private readonly deleteClientUseCase: IDeleteClientUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deleteClientUseCase.execute(input.params)
      return success(200, {})
    } catch (error) {
      return handleError(error as Error)
    }
  }
}
