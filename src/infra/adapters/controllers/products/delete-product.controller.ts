import { IController, IDeleteProductUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, ProductNotFoundError, InvalidParamError, MissingParamError, badRequest, serverError } from '@/infra/shared'

export class DeleteProductController implements IController {
  constructor(private readonly deleteProductUseCase: IDeleteProductUseCase) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const productId = input.params.productId

      const response = await this.deleteProductUseCase.execute(productId)
      return success(200, response)
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
