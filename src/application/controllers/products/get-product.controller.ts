import { IController } from '@/ports/'
import { badRequest, serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { MissingParamError } from '../../../shared/errors'
import { IGetProductUseCase } from '../../../ports/usecases/product/get-product.port'

export class GetProductController implements IController {
  constructor(private readonly getProductUseCase: IGetProductUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const productId = input.params.productId
      if (!productId) throw new MissingParamError('product id')

      const product = await this.getProductUseCase.execute(productId)
      return success(200, product)
    } catch (error: any) {
      if (error instanceof MissingParamError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
