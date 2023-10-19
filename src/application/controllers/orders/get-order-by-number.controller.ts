import { IController } from '@/ports'
import { IGetOrderByNumberUseCase } from '@/ports/usecases/order/get-order-by-number.port'
import { badRequest, serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { InvalidParamError, MissingParamError, SchemaValidationError } from '../../../shared/errors'

export class GetOrderByNumberController implements IController {
  constructor(private readonly getOrderByNumberUseCase: IGetOrderByNumberUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.getOrderByNumberUseCase.execute(input.params.orderNumber)
      return success(200, output)
    } catch (error: any) {
      if (error instanceof InvalidParamError || error instanceof MissingParamError || error instanceof SchemaValidationError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
