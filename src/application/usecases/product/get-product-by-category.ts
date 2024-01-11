import { ISchemaValidator } from '../../interfaces/validators/schema-validator.interface'
import { IGetProductByCategoryUseCase } from '../../interfaces/usecases/product/get-product-by-category.interface'
import { ProductNotFoundError, InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'
import { IGetProductByCategoryGateway } from '@/application/interfaces/gateways/product/get-product-by-category.gateway.interface'

export class GetProductByCategoryUseCase implements IGetProductByCategoryUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly gateway: IGetProductByCategoryGateway
  ) {}

  async execute(
    input: IGetProductByCategoryUseCase.Input
  ): Promise<IGetProductByCategoryUseCase.Output[]> {
    await this.validateSchema(input)
    await this.validateCategory(input)
    const products = await this.gateway.getProductByCategory(input)
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
