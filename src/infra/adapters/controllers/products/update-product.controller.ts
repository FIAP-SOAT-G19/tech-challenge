import { IController, IUpdateProductUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, ProductNotFoundError, MissingParamError, InvalidParamError, badRequest, serverError } from '@/infra/shared'

export class UpdateProductController implements IController {
  constructor(private readonly updateProductUseCase: IUpdateProductUseCase) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const id = input.params.productId
      const { name, category, price, description, image } = input.body

      const product = await this.updateProductUseCase.execute({
        id,
        name,
        category,
        price,
        description,
        image
      })
      return success(200, product)
    } catch (error: any) {
      if (
        error instanceof ProductNotFoundError ||
        error instanceof MissingParamError ||
        error instanceof InvalidParamError
      ) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
