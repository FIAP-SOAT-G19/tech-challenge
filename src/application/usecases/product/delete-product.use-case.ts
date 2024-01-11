import { ISchemaValidator } from '../../interfaces/validators/schema-validator.interface'
import { IDeleteProductUseCase } from '../../interfaces/usecases/product/delete-product.interface'
import { ServerError, InvalidParamError, MissingParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'
import { IDeleteProductGateway } from '@/application/interfaces/gateways/product/delete-product-gateway.interface'

export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly gateway: IDeleteProductGateway
  ) {}

  async execute(
    input: IDeleteProductUseCase.Input
  ): Promise<IDeleteProductUseCase.Output> {
    await this.validateSchema(input)
    await this.validateProductId(input)
    const isProductDeleted = await this.gateway.deleteProduct(input)
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
