import { ISchemaValidator } from '../../../ports/validators/schema-validator.port'
import constants from '../../../shared/constants'
import { InvalidParamError, ProductNotFoundError } from '../../../shared/errors'
import { IProductRepository } from '../../../ports/repositories/product.port'
import { IGetProductUseCase } from '../../../ports/usecases/product/get-product.port'

export class GetProductUseCase implements IGetProductUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly productRepository: IProductRepository
  ) {}

  async execute(
    input: IGetProductUseCase.Input
  ): Promise<IGetProductUseCase.Output> {
    await this.validateSchema(input)
    const product = await this.productRepository.getById(input)
    if (!product) {
      throw new ProductNotFoundError()
    }
    return product
  }

  private async validateSchema(
    input: IGetProductUseCase.Input
  ): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.GET_PRODUCT,
      data: input
    })
    if (validation.error) {
      throw new InvalidParamError(validation.error)
    }
  }
}
