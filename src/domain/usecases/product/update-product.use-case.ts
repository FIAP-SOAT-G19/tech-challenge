import { ISchemaValidator } from '../../../ports/validators/schema-validator.port'
import constants from '../../../shared/constants'
import {
  InvalidParamError,
  MissingParamError,
  ServerError
} from '../../../shared/errors'
import { IProductRepository } from '../../../ports/repositories/product.port'
import { IUpdateProductUseCase } from '../../../ports/usecases/product/update-product.port'

export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly productRepository: IProductRepository
  ) {}

  async execute(
    input: IUpdateProductUseCase.Input
  ): Promise<IUpdateProductUseCase.Output> {
    await this.validateProductId(input.id)
    await this.validateSchema(input)
    if (input.category) {
      await this.validateCategory(input.category)
    }
    if (input.price) {
      await this.validatePrice(input.price)
    }

    const updatedProduct = await this.productRepository.update(input)
    if (!updatedProduct) {
      throw new ServerError()
    }
    return updatedProduct
  }

  private async validateProductId(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError('product id')
    }
  }

  private async validateSchema(
    input: IUpdateProductUseCase.Input
  ): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.UPDATE_PRODUCT,
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

  private async validatePrice(price: number): Promise<void> {
    if (typeof price === 'string') {
      throw new InvalidParamError('invalid price')
    }
    if (price <= 0) {
      throw new InvalidParamError('price must be greater than zero')
    }
  }
}
