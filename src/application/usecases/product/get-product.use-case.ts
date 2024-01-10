import { ISchemaValidator } from '../../interfaces/validators/schema-validator.interface'
import { IGetProductUseCase } from '../../interfaces/usecases/product/get-product.interface'
import { ProductNotFoundError, InvalidParamError, MissingParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'
import { IGetProductByIdGateway } from '@/application/interfaces/gateways/product/get-product-by-id-gateway.interface'

export class GetProductUseCase implements IGetProductUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly gateway: IGetProductByIdGateway
  ) {}

  async execute(
    input: IGetProductUseCase.Input
  ): Promise<IGetProductUseCase.Output> {
    await this.validateSchema(input)
    await this.validateProductId(input)
    const product = await this.gateway.getProductById(input)
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

  private async validateProductId(
    id: string
  ): Promise<void> {
    if (!id) {
      throw new MissingParamError('product id')
    }
  }
}
