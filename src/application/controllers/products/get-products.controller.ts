import { IController } from '@/ports/'
import { serverError, success } from '../../../shared/helpers/http.helper'
import { HttpResponse } from '../../../shared/types/http.types'
import { IGetProductsUseCase } from '../../../ports/usecases/product/get-products.port'

export class GetProductsController implements IController {
  constructor(private readonly getProductsUseCase: IGetProductsUseCase) {}
  async execute (): Promise<HttpResponse> {
    try {
      const products = await this.getProductsUseCase.execute()
      return success(200, products)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
