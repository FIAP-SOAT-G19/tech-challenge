import { IController } from '@/ports'
import { IGetAllClientsUseCase } from '@/ports/usecases/client/get-all-clients.port'
import { handleError } from '@/shared'
import { success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

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
