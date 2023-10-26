import { IController } from '@/ports'
import { IDeleteClientUseCase } from '@/ports/usecases/client/delete-client.port'
import { handleError } from '@/shared'
import { success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

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
