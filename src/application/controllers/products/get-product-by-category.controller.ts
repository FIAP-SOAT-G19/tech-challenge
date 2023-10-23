import { IController } from '@/ports/'
import {
  badRequest,
  serverError,
  success
} from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import {
  InvalidParamError,
  ProductNotFoundError
} from '../../../shared/errors'
import { IGetProductByCategoryUseCase } from '../../../ports/usecases/product/get-product-by-category.port'

export class GetProductByCategoryController implements IController {
  constructor(private readonly getProductByCategoryUseCase: IGetProductByCategoryUseCase) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const productCategory = input.params.category

      const products = await this.getProductByCategoryUseCase.execute(productCategory)
      return success(200, products)
    } catch (error: any) {
      if (
        error instanceof ProductNotFoundError ||
        error instanceof InvalidParamError
      ) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
