import { IController, ICreateProductUseCase } from '@/ports/'
import {
  badRequest,
  serverError,
  success
} from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { InvalidParamError, MissingParamError } from '../../../shared/errors'

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
