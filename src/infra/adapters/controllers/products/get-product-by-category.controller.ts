import { IController, IGetProductByCategoryUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, ProductNotFoundError, InvalidParamError, badRequest, serverError } from '@/infra/shared'

export class GetProductByCategoryController implements IController {
  constructor(private readonly getProductByCategoryUseCase: IGetProductByCategoryUseCase) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const productCategory = input.query.category

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
