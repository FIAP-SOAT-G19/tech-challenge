import { IController } from '@/ports/'
import {
  badRequest,
  serverError,
  success
} from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { InvalidParamError, MissingParamError, ProductNotFoundError } from '../../../shared/errors'
import { IDeleteProductUseCase } from '../../../ports/usecases/product/delete-product.port'

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
