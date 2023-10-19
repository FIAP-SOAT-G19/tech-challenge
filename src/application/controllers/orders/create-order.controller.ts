import { ICreateOrderUseCase, IController } from '@/ports/'
import { success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { handleError } from '../../../shared/errors/handle-error'

export class CreateOrderController implements IController {
  constructor(private readonly createOrderUseCase: ICreateOrderUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.createOrderUseCase.execute(input.body)
      return success(201, output)
    } catch (error: any) {
      return handleError(error)
    }
  }
}
