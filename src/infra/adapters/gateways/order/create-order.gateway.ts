import { Client, SaveOrderInput, SaveOrderProductInput, GetProductByIdOutput, IClientRepository, IOrderRepository, IOrderProductRepository, IProductRepository } from '@/application/interfaces'
import { ICreateOrderGateway } from '@/application/interfaces/gateways/order/create-order-gateway.interface'

export class CreateOrderGateway implements ICreateOrderGateway {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly orderProductRepository: IOrderProductRepository,
    private readonly productRepository: IProductRepository
  ) {}

  async getClientById (clientId: string): Promise<Client | null> {
    return await this.clientRepository.getById(clientId)
  }

  async saveOrder (input: SaveOrderInput): Promise<string> {
    return await this.orderRepository.save(input)
  }

  async saveOrderProduct (input: SaveOrderProductInput): Promise<void> {
    await this.orderProductRepository.save(input)
  }

  async getProductById (productId: string): Promise<GetProductByIdOutput | null> {
    return await this.productRepository.getById(productId)
  }
}
