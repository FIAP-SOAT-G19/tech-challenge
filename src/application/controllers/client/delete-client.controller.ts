import { IController } from '@/ports'
import { IDeleteClientUseCase } from '@/ports/usecases/client/delete-client.port'
import { serverError, success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class DeleteClientController implements IController {
  constructor(private readonly deleteClientUseCase: IDeleteClientUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const clientId = await this.deleteClientUseCase.execute(input.params)
      return success(200, { clientId })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
