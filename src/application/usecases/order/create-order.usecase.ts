import { ICreateOrderUseCase, ISchemaValidator, IUUIDGenerator, IClientRepository, IOrderRepository, IOrderProductRepository, IProductRepository } from '@/application/interfaces'
import { SchemaValidationError, InvalidParamError, ramdonStringGenerator } from '@/infra/shared'
import constants from '@/infra/shared/constants'
import { OrderProduct } from './order-products.types'

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly clientRepository: IClientRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly orderProductRepository: IOrderProductRepository,
    private readonly productRepository: IProductRepository
  ) {}

  async execute (input: ICreateOrderUseCase.Input): Promise<ICreateOrderUseCase.Output> {
    await this.validate(input)

    const { orderId, orderNumber } = await this.saveOrder(input)

    await this.saveOrderProducts(orderId, input.products)

    return {
      orderNumber
    }
  }

  private async validate (input: ICreateOrderUseCase.Input): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.ORDER,
      data: input
    })

    if (validation.error) {
      throw new SchemaValidationError(validation.error)
    }

    for (const product of input.products) {
      const productExists = await this.productRepository.getById(product.id)
      if (!productExists) {
        throw new InvalidParamError('productId')
      }
    }

    if (input.clientId) {
      const client = await this.clientRepository.getById(input.clientId)
      if (!client) {
        throw new InvalidParamError('clientId')
      }
    }
  }

  private async saveOrder (input: ICreateOrderUseCase.Input): Promise<{ orderId: string, orderNumber: string }> {
    const orderId = this.uuidGenerator.generate()
    const orderNumber = ramdonStringGenerator()

    await this.orderRepository.save({
      id: orderId,
      orderNumber,
      clientId: input.clientId ?? null,
      clientDocument: input.clientDocument ?? null,
      status: constants.ORDER_STATUS.WAITING_PAYMENT,
      totalValue: this.calculateTotalValue(input.products),
      createdAt: new Date()
    })

    return { orderId, orderNumber }
  }

  private async saveOrderProducts (orderId: string, products: OrderProduct []): Promise<void> {
    for (const product of products) {
      await this.orderProductRepository.save({
        id: this.uuidGenerator.generate(),
        orderId,
        productId: product.id,
        productPrice: product.price,
        amount: product.amount,
        createdAt: new Date()
      })
    }
  }

  public calculateTotalValue (products: OrderProduct []): number {
    return products.reduce((accumulator, element) => accumulator + (element.price * element.amount), 0)
  }
}
