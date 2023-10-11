import { ICreateOrderUseCase, IController } from '@/ports/'
import { serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'

export class CreateOrderController implements IController {
  constructor(private readonly createOrderUseCase: ICreateOrderUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.createOrderUseCase.execute(input.body)
      return success(201, output)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
