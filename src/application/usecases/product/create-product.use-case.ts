import { ICreateProductUseCase } from '../../interfaces/usecases/product/create-product.interface'
import { IUUIDGenerator } from '../../interfaces/usecases/uuid/uuid-generator.interface'
import { ISchemaValidator } from '../../interfaces/validators/schema-validator.interface'
import { ServerError, MissingParamError, InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'
import { ICreateProductGateway } from '@/application/interfaces/gateways/product/create-product-gateway.interface'

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly gateway: ICreateProductGateway
  ) {}

  async execute(
    input: ICreateProductUseCase.Input
  ): Promise<ICreateProductUseCase.Output> {
    await this.validateRequiredInput(input)
    await this.validateSchema(input)
    await this.validateCategory(input.category)
    await this.validatePrice(input.price)
    const productId = await this.gateway.saveProduct({
      ...input,
      id: this.uuidGenerator.generate(),
      createdAt: new Date()
    })
    if (!productId) {
      throw new ServerError()
    }
    return { productId }
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
    if (typeof price === 'string') {
      throw new InvalidParamError('invalid price')
    }
    if (price <= 0) {
      throw new InvalidParamError('price must be greater than zero')
    }
  }
}
