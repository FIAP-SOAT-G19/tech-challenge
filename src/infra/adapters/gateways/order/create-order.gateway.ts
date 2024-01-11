import { Client, SaveOrderInput, SaveOrderProductInput, GetProductByIdOutput, IClientRepository, IOrderRepository, IOrderProductRepository, IProductRepository, ICreateOrderGateway, CreatePaymentInput, IPaymentRepository } from '@/application/interfaces'

export class CreateOrderGateway implements ICreateOrderGateway {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly orderProductRepository: IOrderProductRepository,
    private readonly productRepository: IProductRepository,
    private readonly paymentRepository: IPaymentRepository
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

  async createPayment (input: CreatePaymentInput): Promise<void> {
    await this.paymentRepository.save(input)
  }
}
