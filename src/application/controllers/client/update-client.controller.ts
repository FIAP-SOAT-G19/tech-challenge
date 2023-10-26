import { success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { IUpdateClientUseCase } from '@/ports/usecases/client/update-client.port'
import { IController } from '@/ports'
import { handleError } from '@/shared'

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
