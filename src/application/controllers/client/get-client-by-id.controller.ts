import { IController } from '@/ports'
import { IGetClientByIdUseCase } from '@/ports/usecases/client/get-client-by-id.port'
import { serverError, success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class GetClientByIdController implements IController {
  constructor(private readonly getClientByIdUseCase: IGetClientByIdUseCase) { }

  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const client = await this.getClientByIdUseCase.execute(input.params)
      return success(200, { client })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
