import { ICreateProductUseCase } from '../../../ports/usecases/product/create-product.port'
import { IUUIDGenerator } from '../../../ports/usecases/uuid/uuid-generator.port'
import { ISchemaValidator } from '../../../ports/validators/schema-validator.port'
import constants from '../../../shared/constants'
import {
  InvalidParamError,
  MissingParamError,
  ServerError
} from '../../../shared/errors'
import { IProductRepository } from '../../../ports/repositories/product.port'

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly productRepository: IProductRepository
  ) {}

  async execute(
    input: ICreateProductUseCase.Input
  ): Promise<ICreateProductUseCase.Output> {
    await this.validateRequiredInput(input)
    await this.validateSchema(input)
    await this.validateCategory(input.category)
    await this.validatePrice(input.price)
    const productId = await this.productRepository.save({
      ...input,
      id: this.uuidGenerator.generate(),
      createdAt: new Date()
    })
    if (!productId) {
      throw new ServerError()
    }
    return productId
  }

  private async validateRequiredInput(
    input: ICreateProductUseCase.Input
  ): Promise<void> {
    const requiredInputs: Array<keyof ICreateProductUseCase.Input> = [
      'name',
      'category',
      'price',
      'description',
      'image'
    ]

    requiredInputs.forEach((param) => {
      if (!input[param]) {
        throw new MissingParamError(`product ${param}`)
      }
    })
  }

  private async validateSchema(
    input: ICreateProductUseCase.Input
  ): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.PRODUCT,
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
    if (price <= 0) {
      throw new InvalidParamError('price must be greater than zero')
    }
  }
}
