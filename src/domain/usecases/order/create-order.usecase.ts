import {
  IClientRepository, ICreateOrderUseCase, IOrderProductRepository, IOrderRepository,
  IPayment, ISchemaValidator, IUUIDGenerator, PaymentItems
} from '@/ports/'
import { InvalidParamError } from '@/shared/errors'
import constants from '@/shared/constants'
import { Product } from '@/domain/types/products.types'
export class CreateOrderUseCase implements ICreateOrderUseCase {
  private orderTotalValue: number = 0

  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly clientRepository: IClientRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly orderProductRepository: IOrderProductRepository,
    private readonly paymentGateway: IPayment
  ) {}

  async execute (input: ICreateOrderUseCase.Input): Promise<ICreateOrderUseCase.Output> {
    await this.validate(input)

    this.orderTotalValue = this.calculateTotalValue(input.products)

    const orderId = await this.saveOrder(input)

    await this.saveOrderProducts(orderId, input.products)

    const processedPayment = await this.paymentGateway.process(this.makePaymentInput(orderId, input))

    await this.orderRepository.updateStatus(processedPayment.status)

    return orderId
  }

  private async validate (input: ICreateOrderUseCase.Input): Promise<void> {
    if (input.clientId) {
      const client = await this.clientRepository.getById(input.clientId)
      if (!client) {
        throw new InvalidParamError('clientId')
      }
    }

    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.ORDER,
      data: input
    })

    if (validation.error) {
      throw new InvalidParamError(validation.error)
    }
  }

  calculateTotalValue (products: Product []): number {
    return products.reduce((accumulator, element) => accumulator + (element.price * element.amount), 0)
  }

  async saveOrder (input: ICreateOrderUseCase.Input): Promise<string> {
    return await this.orderRepository.save({
      id: this.uuidGenerator.generate(),
      clientId: input.clientId ?? null,
      status: constants.ORDER_STATUS.WAITING_PAYMENT,
      totalValue: this.orderTotalValue,
      createdAt: new Date()
    })
  }

  async saveOrderProducts (orderId: string, products: Product []): Promise<void> {
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

  makePaymentInput (orderId: string, input: ICreateOrderUseCase.Input): IPayment.Input {
    const items: PaymentItems [] = []

    input.products.map((item) => {
      return items.push({
        category: item.category,
        title: item.name,
        description: item.description,
        unit_price: item.price,
        amount: item.amount,
        total_amount: item.price * item.amount
      })
    })

    return {
      external_reference: orderId,
      title: constants.PAYMENT.DEFAULT_TITLE,
      total_amount: this.orderTotalValue,
      items
    }
  }
}
