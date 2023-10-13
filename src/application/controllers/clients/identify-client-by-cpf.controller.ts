import { IController } from '@/ports/controllers/index.port'
import { success, serverError } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { IIdentifyClientByCpfUseCase } from '@/ports/usecases/client/identify-client-by-cpf.port'

export class IdentifyClientByCpfController implements IController {
  constructor(private readonly identifyClientByCpfUseCase: IIdentifyClientByCpfUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const client = await this.identifyClientByCpfUseCase.execute(input.params)
      return success(200, client)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
