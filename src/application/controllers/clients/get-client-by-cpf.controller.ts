import { IController } from '@/ports/controllers/index.port'
import { success, serverError } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { IGetClientByCpfUseCase } from '@/ports/usecases/client/get-client-by-cpf.port'

export class GetClientByCpfController implements IController {
  constructor(private readonly getClientByCpfUseCase: IGetClientByCpfUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const client = await this.getClientByCpfUseCase.execute(input.params)
      return success(200, client)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
