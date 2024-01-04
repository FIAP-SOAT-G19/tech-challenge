import { IGetOrderByNumberGateway } from '@/application/interfaces'
import { IGetOrderStatusUseCase } from '@/application/interfaces/usecases/order/get-order-status.interface'
import { InvalidParamError } from '@/infra/shared'

export class GetOrderStatusUseCase implements IGetOrderStatusUseCase {
  constructor(private readonly gateway: IGetOrderByNumberGateway) {}
  async execute (orderNumber: string): Promise<IGetOrderStatusUseCase.Output> {
    const order = await this.gateway.getByOrderNumber(orderNumber)

    if (!order) {
      throw new InvalidParamError('Order not found')
    }

    return { status: order.status }
  }
}
