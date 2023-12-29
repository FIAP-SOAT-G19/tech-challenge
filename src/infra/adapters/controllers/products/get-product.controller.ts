import { IController, IGetProductUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, ProductNotFoundError, InvalidParamError, MissingParamError, badRequest, serverError } from '@/infra/shared'

export class GetProductController implements IController {
  constructor(private readonly getProductUseCase: IGetProductUseCase) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const productId = input.params.productId

      const product = await this.getProductUseCase.execute(productId)
      return success(200, product)
    } catch (error: any) {
      if (
        error instanceof ProductNotFoundError ||
        error instanceof InvalidParamError ||
        error instanceof MissingParamError
      ) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
