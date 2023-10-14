import { IController } from '@/ports'
import { ICreateClientUseCase } from '@/ports/usecases/client/create-client.port'
import { serverError, success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class CreateClientController implements IController {
  constructor(private readonly createClientUseCase: ICreateClientUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const clientId = await this.createClientUseCase.execute(input.body)
      return success(201, { clientId })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
