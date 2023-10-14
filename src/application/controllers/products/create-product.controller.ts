import { IController, ICreateProductUseCase } from '@/ports/'
import { badRequest, serverError, success } from '../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { MissingParamError } from '../../../shared/errors'

export class CreateProductController implements IController {
  constructor(private readonly createProductUseCase: ICreateProductUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const productName = input.body.name
      if (!productName) throw new MissingParamError('product name')
      const productCategory = input.body.category
      if (!productCategory) throw new MissingParamError('product category')
      const productPrice = input.body.price
      if (!productPrice) throw new MissingParamError('product price')
      const productDescription = input.body.description
      if (!productDescription) throw new MissingParamError('product description')
      const productImage = input.body.image
      if (!productImage) throw new MissingParamError('product image')

      const productId = await this.createProductUseCase.execute(input.body)
      return success(201, { productId })
    } catch (error: any) {
      if (error instanceof MissingParamError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
