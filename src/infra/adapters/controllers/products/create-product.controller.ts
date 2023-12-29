import { IController, ICreateProductUseCase } from '@/application/interfaces'
import { HttpRequest, HttpResponse, success, MissingParamError, InvalidParamError, badRequest, serverError } from '@/infra/shared'

export class CreateProductController implements IController {
  constructor(private readonly createProductUseCase: ICreateProductUseCase) {}
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const productId = await this.createProductUseCase.execute(input.body)
      return success(201, productId)
    } catch (error: any) {
      if (
        error instanceof MissingParamError ||
        error instanceof InvalidParamError
      ) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
