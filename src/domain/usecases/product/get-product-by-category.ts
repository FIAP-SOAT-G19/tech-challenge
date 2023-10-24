import { ISchemaValidator } from '../../../ports/validators/schema-validator.port'
import constants from '../../../shared/constants'
import { InvalidParamError, ProductNotFoundError } from '../../../shared/errors'
import { IProductRepository } from '../../../ports/repositories/product.port'
import { IGetProductByCategoryUseCase } from '../../../ports/usecases/product/get-product-by-category.port'

export class GetProductByCategoryUseCase implements IGetProductByCategoryUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly productRepository: IProductRepository
  ) {}

  async execute(
    input: IGetProductByCategoryUseCase.Input
  ): Promise<IGetProductByCategoryUseCase.Output[]> {
    await this.validateSchema(input)
    await this.validateCategory(input)
    const products = await this.productRepository.getByCategory(input)
    if (!products) {
      throw new ProductNotFoundError()
    }
    return products
  }

  private async validateSchema(
    input: IGetProductByCategoryUseCase.Input
  ): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.GET_PRODUCT,
      data: input
    })
    if (validation.error) {
      throw new InvalidParamError(validation.error)
    }
  }

  private async validateCategory(category: string): Promise<void> {
    const productCategories = Object.values(constants.PRODUCT_CATEGORY)
    if (!productCategories.includes(category)) {
      throw new InvalidParamError('invalid product category')
    }
  }
}
