import { IController, IGetProductsUseCase } from '@/application/interfaces'
import { HttpResponse, success, serverError } from '@/infra/shared'

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
