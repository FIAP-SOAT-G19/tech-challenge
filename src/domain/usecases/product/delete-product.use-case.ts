import { ISchemaValidator } from '../../../ports/validators/schema-validator.port'
import constants from '../../../shared/constants'
import {
  InvalidParamError,
  MissingParamError,
  ServerError
} from '../../../shared/errors'
import { IProductRepository } from '../../../ports/repositories/product.port'
import { IDeleteProductUseCase } from '../../../ports/usecases/product/delete-product.port'

export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly productRepository: IProductRepository
  ) {}

  async execute(
    input: IDeleteProductUseCase.Input
  ): Promise<IDeleteProductUseCase.Output> {
    await this.validateSchema(input)
    await this.validateProductId(input)
    const isProductDeleted = await this.productRepository.delete(input)
    if (!isProductDeleted) {
      throw new ServerError()
    }
    return {
      message: 'Product deleted',
      productId: input
    }
  }

  private async validateSchema(
    input: IDeleteProductUseCase.Input
  ): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.DELETE_PRODUCT,
      data: input
    })
    if (validation.error) {
      throw new InvalidParamError(validation.error)
    }
  }

  private async validateProductId(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError('product id')
    }
  }
}
