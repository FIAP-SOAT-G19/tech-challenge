import { IController } from '@/ports/'
import { badRequest, serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { IGetProductUseCase } from '../../../ports/usecases/product/get-product.port'
import { ProductNotFoundError } from '../../../shared/errors'

export class GetProductController implements IController {
  constructor(private readonly getProductUseCase: IGetProductUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const productId = input.params.productId

      const product = await this.getProductUseCase.execute(productId)
      return success(200, product)
    } catch (error: any) {
      if (error instanceof ProductNotFoundError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
