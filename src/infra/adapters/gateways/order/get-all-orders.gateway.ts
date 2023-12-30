import { GetAllOrdersInput, GetAllOrdersOutput, IOrderRepository } from '@/application/interfaces'
import { IGetAllOrdersGateway } from '@/application/interfaces/gateways/order/get-all-order-gateway.interface'

export class GetAllOrdersGateway implements IGetAllOrdersGateway {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async getAllOrders (input: GetAllOrdersInput): Promise<GetAllOrdersOutput> {
    return await this.orderRepository.getAll(input)
  }
}
